'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { WAIVER_PARAGRAPHS } from '@/lib/waiver-text';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed';

const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-500';

export default function WaiverPage() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasScrolled(true); },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const canSubmit =
    hasScrolled && agreed &&
    firstName.trim().length > 0 && lastName.trim().length > 0 &&
    formState === 'idle';

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || submittedRef.current) return;
    submittedRef.current = true;
    setFormState('loading');
    try {
      const res = await fetch('/api/waiver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName.trim(), middleInitial: middleInitial.trim(), lastName: lastName.trim(), agreed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setFormState('error');
        submittedRef.current = false;
        return;
      }
      setFormState('success');
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setFormState('error');
      submittedRef.current = false;
    }
  }, [canSubmit, firstName, middleInitial, lastName, agreed]);

  if (formState === 'success') {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-black px-6 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500 shadow-[0_0_48px_rgba(34,197,94,0.5)]">
          <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-black text-white">Waiver Accepted</h1>
        <p className="mt-3 text-lg text-white/60">You&apos;re good to go. Enjoy the event!</p>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-gray-100">

      {/* Header */}
      <div className="shrink-0 bg-black px-5 py-4 shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-red-500">ADK Automotive</p>
        <h1 className="text-xl font-black uppercase leading-tight text-white tracking-tight">Event Waiver</h1>
      </div>

      {/* Scroll hint banner */}
      {!hasScrolled && (
        <div className="shrink-0 flex items-center justify-center gap-2 bg-amber-400 py-2.5 px-4">
          <span className="text-sm font-bold text-amber-900">↓ Read and scroll to the bottom to continue</span>
        </div>
      )}

      {/* Waiver text — white card, readable */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="rounded-2xl bg-white shadow-sm border border-gray-200 px-6 py-7 space-y-5">
            {WAIVER_PARAGRAPHS.map((block, i) => {
              if (block.type === 'title') return (
                <h2 key={i} className="text-base font-black leading-snug text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-4">
                  {block.text}
                </h2>
              );
              if (block.type === 'closing') return (
                <p key={i} className="text-sm font-semibold leading-relaxed text-gray-800 border-t border-gray-100 pt-4">
                  {block.text}
                </p>
              );
              return (
                <p key={i} className="text-sm leading-[1.75] text-gray-700">
                  {block.text}
                </p>
              );
            })}

            {/* Sentinel */}
            <div ref={sentinelRef} className="flex items-center gap-3 pt-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">End of Agreement</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Form — below waiver text, inside scroll area */}
        <div className="mx-auto max-w-2xl px-4 pb-8">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white shadow-sm border border-gray-200 px-6 py-7 space-y-5">

            <div>
              <p className="text-base font-black uppercase tracking-wide text-gray-900">Sign the Waiver</p>
              <p className="mt-1 text-sm text-gray-500">Enter your legal name exactly as it appears on your ID.</p>
            </div>

            <div className="grid grid-cols-[1fr_72px_1fr] gap-2.5">
              <div>
                <label className={labelClass}>First Name *</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} maxLength={50} autoComplete="given-name" disabled={!hasScrolled} className={inputClass} placeholder="First" />
              </div>
              <div>
                <label className={labelClass}>M.I.</label>
                <input value={middleInitial} onChange={e => setMiddleInitial(e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase())} maxLength={1} autoComplete="additional-name" disabled={!hasScrolled} className={`${inputClass} text-center`} placeholder="M" />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} maxLength={50} autoComplete="family-name" disabled={!hasScrolled} className={inputClass} placeholder="Last" />
              </div>
            </div>

            <label className={`flex items-start gap-3 rounded-xl border p-4 transition cursor-pointer ${agreed ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} ${!hasScrolled ? 'opacity-40 pointer-events-none' : ''}`}>
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} disabled={!hasScrolled} className="mt-0.5 h-5 w-5 shrink-0 accent-red-600" />
              <span className="text-sm font-medium leading-snug text-gray-700">
                I have read and fully understand this Release of Liability. I agree to its terms of my own free will.
              </span>
            </label>

            {formState === 'error' && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700">{errorMsg}</div>
            )}

            {!hasScrolled && (
              <p className="text-center text-xs font-semibold text-amber-600">Please read the full waiver above before signing.</p>
            )}

            <button type="submit" disabled={!canSubmit} className="w-full rounded-2xl bg-red-600 py-5 text-lg font-black uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30">
              {formState === 'loading' ? 'Submitting…' : 'Sign & Submit Waiver'}
            </button>

            <p className="text-center text-[11px] text-gray-400 leading-snug">
              By submitting, you confirm you are 18+ and agree to this waiver on behalf of yourself.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
