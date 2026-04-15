import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
  const supabase = getSupabase();

  // Duplicate check — same full name submitted today
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: existing, error: checkError } = await supabase
    .from('waivers')
    .select('id')
    .eq('name', fullName)
    .gte('created_at', todayStart.toISOString())
    .limit(1);

  if (checkError) {
    console.error('Supabase check error:', checkError.message);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }

  if (existing && existing.length > 0) {
    return NextResponse.json(
      { error: 'A waiver was already submitted under this name today.' },
      { status: 409 }
    );
  }

  // Insert
  const { error: insertError } = await supabase.from('waivers').insert({
    name: fullName,
    agreed: true,
    ip_address: ip,
    user_agent: userAgent,
  });

  if (insertError) {
    console.error('Supabase insert error:', insertError.message);
    return NextResponse.json({ error: 'Failed to save waiver. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
