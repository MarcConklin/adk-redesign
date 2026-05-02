import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';

// In-memory rate limiting (per serverless instance — good enough for burst protection)
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 5; // max 5 submissions per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rateMap.set(ip, hits);
  return hits.length > RATE_MAX;
}

function sanitize(str: string): string {
  return str.replace(/[<>"'`]/g, '').trim().slice(0, 100);
}

type WaiverRecord = {
  name: string;
  agreed: boolean;
  ip_address: string;
  user_agent: string;
  created_at: string;
};

const localWaiverPath = path.join(process.cwd(), '.data', 'waivers.json');

async function loadLocalWaivers(): Promise<WaiverRecord[]> {
  try {
    const raw = await readFile(localWaiverPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveLocalWaivers(records: WaiverRecord[]): Promise<void> {
  await mkdir(path.dirname(localWaiverPath), { recursive: true });
  await writeFile(localWaiverPath, JSON.stringify(records, null, 2), 'utf8');
}

async function saveWaiverLocally(input: {
  fullName: string;
  ip: string;
  userAgent: string;
}): Promise<'saved' | 'duplicate'> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const waivers = await loadLocalWaivers();
  const duplicate = waivers.some(
    record =>
      record.name === input.fullName &&
      new Date(record.created_at).getTime() >= todayStart.getTime()
  );

  if (duplicate) {
    return 'duplicate';
  }

  waivers.push({
    name: input.fullName,
    agreed: true,
    ip_address: input.ip,
    user_agent: input.userAgent,
    created_at: new Date().toISOString(),
  });

  await saveLocalWaivers(waivers);
  return 'saved';
}

function getSupabase() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseKey = serviceRoleKey ?? anonKey;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
  }

  return createClient(
    supabaseUrl,
    supabaseKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export async function POST(req: NextRequest) {
  // Get IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  // Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please wait a moment and try again.' },
      { status: 429 }
    );
  }

  // Parse body
  let body: { firstName?: string; middleInitial?: string; lastName?: string; agreed?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { firstName, middleInitial, lastName, agreed } = body;

  // Validate
  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json({ error: 'First name and last name are required.' }, { status: 400 });
  }
  if (!agreed) {
    return NextResponse.json({ error: 'You must agree to the waiver terms.' }, { status: 400 });
  }

  // Sanitize
  const cleanFirst = sanitize(firstName);
  const cleanMiddle = middleInitial ? sanitize(middleInitial).replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase() : '';
  const cleanLast = sanitize(lastName);
  const fullName = [cleanFirst, cleanMiddle, cleanLast].filter(Boolean).join(' ');

  const userAgent = req.headers.get('user-agent') ?? 'unknown';
  try {
    const supabase = getSupabase();

    const { error: insertError } = await supabase.from('waivers').insert({
      name: fullName,
      agreed: true,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (insertError) {
      console.warn('Supabase insert error:', insertError.message);
      if (process.env.NODE_ENV !== 'production') {
        const localResult = await saveWaiverLocally({ fullName, ip, userAgent });
        if (localResult === 'duplicate') {
          return NextResponse.json(
            { error: 'A waiver was already submitted under this name today.' },
            { status: 409 }
          );
        }
        return NextResponse.json({ success: true, fallback: 'local' }, { status: 200 });
      }
      return NextResponse.json({ error: 'Failed to save waiver. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.warn('Supabase request failed:', error);
    if (process.env.NODE_ENV !== 'production') {
      const localResult = await saveWaiverLocally({ fullName, ip, userAgent });
      if (localResult === 'duplicate') {
        return NextResponse.json(
          { error: 'A waiver was already submitted under this name today.' },
          { status: 409 }
        );
      }
      return NextResponse.json({ success: true, fallback: 'local' }, { status: 200 });
    }
    return NextResponse.json({ error: 'Failed to save waiver. Please try again.' }, { status: 500 });
  }
}
