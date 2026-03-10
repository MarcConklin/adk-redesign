import { NextResponse } from 'next/server';
import { Resend } from 'resend';

type BasePayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type ContactPayload = BasePayload & {
  formType: 'contact' | 'prayer';
};

type InquiryPayload = BasePayload & {
  formType: 'inquiry';
  inquiryType: string;
  newsletter: boolean;
};

type FormPayload = ContactPayload | InquiryPayload;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isBasePayload(payload: unknown): payload is BasePayload {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return ['firstName', 'lastName', 'email', 'subject', 'message'].every(
    (field) => typeof candidate[field] === 'string' && candidate[field].toString().trim().length > 0
  );
}

function isFormPayload(payload: unknown): payload is FormPayload {
  if (!isBasePayload(payload)) {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  if (candidate.formType === 'contact' || candidate.formType === 'prayer') {
    return true;
  }

  return (
    candidate.formType === 'inquiry' &&
    typeof candidate.inquiryType === 'string' &&
    candidate.inquiryType.trim().length > 0 &&
    typeof candidate.newsletter === 'boolean'
  );
}

function renderField(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0 4px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#991b1b;">
        ${escapeHtml(label)}
      </td>
    </tr>
    <tr>
      <td style="padding:0 0 14px;font-size:16px;line-height:1.6;color:#111827;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function emailHtml(payload: FormPayload) {
  const submissionType =
    payload.formType === 'inquiry'
      ? `Inquiry: ${payload.inquiryType}`
      : payload.formType === 'prayer'
        ? 'Prayer Request'
        : 'Contact Message';

  const inquiryRows =
    payload.formType === 'inquiry'
      ? `${renderField('Inquiry Type', payload.inquiryType)}${renderField(
          'Newsletter Opt In',
          payload.newsletter ? 'Yes' : 'No'
        )}`
      : '';

  return `
    <div style="background:#f3f4f6;padding:32px 16px;font-family:Arial,sans-serif;">
      <table style="max-width:680px;width:100%;margin:0 auto;background:#ffffff;border-radius:20px;padding:32px;border:1px solid #e5e7eb;">
        <tr>
          <td style="padding-bottom:24px;">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#dc2626;">ADK Automotive Website</div>
            <h1 style="margin:12px 0 0;font-size:30px;line-height:1.1;color:#111827;">${escapeHtml(submissionType)}</h1>
          </td>
        </tr>
        ${renderField('From', `${payload.firstName} ${payload.lastName}`)}
        ${renderField('Email', payload.email)}
        ${inquiryRows}
        ${renderField('Subject', payload.subject)}
        ${renderField('Message', payload.message)}
      </table>
    </div>
  `;
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!isFormPayload(payload)) {
    return NextResponse.json({ error: 'Invalid form submission.' }, { status: 400 });
  }

  const resend = new Resend(resendApiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? 'ADK Automotive <info@adkautomotive.com>';

  try {
    const { error } = await resend.emails.send({
      from,
      to: ['marc@5k.co'],
      replyTo: payload.email,
      subject: `[ADK Website] ${payload.subject}`,
      html: emailHtml(payload)
    });

    if (error) {
      console.error('Resend send failed', error);
      return NextResponse.json({ error: 'Unable to send message right now.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Resend request failed', error);
    return NextResponse.json({ error: 'Unable to send message right now.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
