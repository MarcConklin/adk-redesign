'use client';

export const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/info@adkautomotive.com';

type ContactFormMode = 'contact' | 'prayer';

type ContactFormProps = {
  mode?: ContactFormMode;
  idPrefix?: string;
  onCancel?: () => void;
  submitClassName?: string;
  cancelClassName?: string;
};

export default function ContactForm({
  mode = 'contact',
  idPrefix = 'contact',
  onCancel,
  submitClassName = 'inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-bold text-lg hover:from-red-800 hover:to-red-600 transition-colors',
  cancelClassName = 'inline-flex items-center justify-center px-8 py-4 rounded-full border border-black/20 text-black font-semibold hover:bg-black hover:text-white transition-colors'
}: ContactFormProps) {
  const isPrayerMode = mode === 'prayer';
  const firstNameId = `${idPrefix}FirstName`;
  const lastNameId = `${idPrefix}LastName`;
  const emailId = `${idPrefix}Email`;
  const subjectId = `${idPrefix}Subject`;
  const messageId = `${idPrefix}Message`;

  return (
    <form key={mode} className="space-y-6" action={FORMSUBMIT_ENDPOINT} method="POST">
      <input
        type="hidden"
        name="_subject"
        value={isPrayerMode ? 'New Prayer Request - ADK Automotive' : 'New Contact Form Submission - ADK Automotive'}
      />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="formType" value={isPrayerMode ? 'prayer' : 'contact'} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={firstNameId} className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
            First Name{isPrayerMode && <span className="ml-1 font-normal normal-case tracking-normal text-black/40">(Optional)</span>}
          </label>
          <input
            id={firstNameId}
            name="firstName"
            required={!isPrayerMode}
            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
          />
        </div>
        <div>
          <label htmlFor={lastNameId} className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
            Last Name{isPrayerMode && <span className="ml-1 font-normal normal-case tracking-normal text-black/40">(Optional)</span>}
          </label>
          <input
            id={lastNameId}
            name="lastName"
            required={!isPrayerMode}
            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
          />
        </div>
      </div>

      {!isPrayerMode && (
        <div>
          <label htmlFor={emailId} className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
          />
        </div>
      )}

      <div>
        <label htmlFor={subjectId} className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
          Subject
        </label>
        <input
          id={subjectId}
          name="subject"
          required
          defaultValue={isPrayerMode ? 'Prayer Request' : ''}
          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div>
        <label htmlFor={messageId} className="mb-2 block text-sm font-bold uppercase tracking-wider text-black">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3.5 text-black outline-none shadow-sm focus:border-red-600 focus:ring-2 focus:ring-red-200"
        />
      </div>

      <div className="flex flex-col gap-4 pt-2 md:flex-row">
        <button type="submit" className={submitClassName}>
          {isPrayerMode ? 'Send Prayer Request' : 'Send Message'}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className={cancelClassName}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
