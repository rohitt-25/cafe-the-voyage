import React, { useEffect, useRef, useState } from 'react';
import { PHONE, PHONE_HREF } from '../lib/design';

/**
 * Reservation request.
 *
 * There is no backend, so the form composes a WhatsApp message and hands the
 * booking to the number the owner already watches all day. That is a feature,
 * not a shortcut: for an Indian cafe, WhatsApp is where bookings actually get
 * confirmed, and it means no server to maintain or leak data.
 *
 * The states are real because the flow is real — inline validation with errors
 * tied to their field via aria-describedby, a confirmation step before anything
 * leaves the page, and a success state that still gives a fallback if the
 * WhatsApp hand-off is blocked by a popup blocker.
 */

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Priya Sharma' },
  { id: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: '98765 43210' },
  { id: 'date', label: 'Date', type: 'date', autoComplete: 'off' },
  { id: 'guests', label: 'Guests', type: 'number', autoComplete: 'off', placeholder: '4' },
];

function validate(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Please tell us who the table is for.';
  else if (values.name.trim().length < 2) errors.name = 'That looks too short to be a name.';

  const digits = (values.phone ?? '').replace(/\D/g, '');
  if (!digits) errors.phone = 'We need a number to confirm your table.';
  else if (digits.length < 10) errors.phone = 'That number looks incomplete — 10 digits please.';

  if (!values.date) errors.date = 'Which day are you coming?';
  else if (new Date(values.date) < new Date(new Date().toDateString()))
    errors.date = 'That date has already passed.';

  const guests = Number(values.guests);
  if (!values.guests) errors.guests = 'How many of you?';
  else if (!Number.isFinite(guests) || guests < 1) errors.guests = 'At least one guest.';
  else if (guests > 20) errors.guests = 'For parties over 20, call us and we will plan it properly.';

  return errors;
}

export default function Reserve() {
  const [values, setValues] = useState({ name: '', phone: '', date: '', guests: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [stage, setStage] = useState('form'); // form | confirming | sent
  const dialogRef = useRef(null);
  const firstErrorRef = useRef(null);

  const set = (id, v) => {
    setValues((p) => ({ ...p, [id]: v }));
    if (touched[id]) setErrors(validate({ ...values, [id]: v }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, date: true, guests: true });
    if (Object.keys(found).length) {
      // Send focus to the first problem rather than announcing errors at the top.
      requestAnimationFrame(() => firstErrorRef.current?.focus());
      return;
    }
    setStage('confirming');
  };

  const message = () =>
    `Hi! I'd like to book a table at Cafe - The Voyage.%0A%0AName: ${encodeURIComponent(values.name)}%0APhone: ${encodeURIComponent(values.phone)}%0ADate: ${encodeURIComponent(values.date)}%0AGuests: ${encodeURIComponent(values.guests)}`;

  const confirm = () => {
    const url = `https://wa.me/918596950267?text=${message()}&utm_source=website&utm_medium=reservation_form&utm_campaign=book_table`;
    window.open(url, '_blank', 'noopener');
    setStage('sent');
  };

  // Modal: trap Escape, restore focus, and lock the page behind it.
  useEffect(() => {
    if (stage !== 'confirming') return;
    const previouslyFocused = document.activeElement;
    const onKey = (e) => e.key === 'Escape' && setStage('form');
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused instanceof HTMLElement && previouslyFocused.focus();
    };
  }, [stage]);

  const firstErrorField = FIELDS.find((f) => errors[f.id])?.id;

  return (
    <section id="booking" className="relative bg-[#0C0A09] py-28 md:py-40 text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.22em] text-white/50">
              Reservations
            </p>
            <h2
              className="mt-4 font-['Satoshi'] font-bold leading-[0.9] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}
            >
              Secure your table
            </h2>
            <p className="mt-6 max-w-[38ch] font-['General_Sans'] text-white/70 leading-relaxed">
              Weekends fill up by Thursday. Send the details and we will confirm on WhatsApp within
              the hour.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-8 inline-flex items-center gap-3 font-['JetBrains_Mono'] text-[14px] uppercase tracking-[0.16em] text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 rounded-full py-2"
            >
              Or call {PHONE}
            </a>
          </div>

          <div className="lg:col-span-7">
            {stage === 'sent' ? (
              <div
                role="status"
                className="rounded-3xl border border-white/15 bg-white/[0.04] p-10 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#A16207]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-['Satoshi'] text-3xl font-bold">Request sent</h3>
                <p className="mx-auto mt-3 max-w-[42ch] font-['General_Sans'] text-white/70">
                  We have opened WhatsApp with your details. If it did not open, message us on{' '}
                  <a className="underline hover:text-white" href={PHONE_HREF}>{PHONE}</a> and we will
                  sort the table out.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValues({ name: '', phone: '', date: '', guests: '' });
                    setTouched({});
                    setErrors({});
                    setStage('form');
                  }}
                  className="mt-8 min-h-[52px] rounded-full border border-white/25 px-8 font-['General_Sans'] transition-colors hover:bg-white hover:text-[#0C0A09] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                >
                  Book another table
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
                {FIELDS.map((f) => {
                  const invalid = Boolean(errors[f.id] && touched[f.id]);
                  return (
                    <div key={f.id} className={f.id === 'name' ? 'sm:col-span-2' : ''}>
                      <label
                        htmlFor={f.id}
                        className="mb-2 block font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.18em] text-white/60"
                      >
                        {f.label}
                      </label>
                      <input
                        ref={f.id === firstErrorField ? firstErrorRef : undefined}
                        id={f.id}
                        name={f.id}
                        type={f.type}
                        inputMode={f.type === 'number' ? 'numeric' : undefined}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={values[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        onBlur={() => {
                          setTouched((p) => ({ ...p, [f.id]: true }));
                          setErrors(validate(values));
                        }}
                        aria-invalid={invalid}
                        aria-describedby={invalid ? `${f.id}-error` : undefined}
                        className={`h-[60px] w-full rounded-2xl border bg-white/[0.04] px-5 font-['General_Sans'] text-white placeholder:text-white/30 transition-colors focus:outline-none focus:ring-4 ${
                          invalid
                            ? 'border-[#F87171] focus:ring-[#F87171]/30'
                            : 'border-white/15 focus:border-white/40 focus:ring-white/20'
                        }`}
                      />
                      {invalid && (
                        <p
                          id={`${f.id}-error`}
                          className="mt-2 font-['General_Sans'] text-[14px] text-[#FCA5A5]"
                        >
                          {errors[f.id]}
                        </p>
                      )}
                    </div>
                  );
                })}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    data-magnetic
                    className="group inline-flex h-[60px] w-full items-center justify-center rounded-full bg-white px-9 font-['General_Sans'] font-medium text-[#0C0A09] transition-colors hover:bg-[#A16207] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 sm:w-auto"
                  >
                    Review reservation
                    <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {stage === 'confirming' && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => e.target === e.currentTarget && setStage('form')}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            tabIndex={-1}
            className="w-full max-w-lg rounded-3xl bg-[#FAFAF9] p-8 text-[#0C0A09] outline-none sm:p-10"
          >
            <h3 id="confirm-title" className="font-['Satoshi'] text-3xl font-bold tracking-[-0.02em]">
              Confirm your details
            </h3>
            <p className="mt-2 font-['General_Sans'] text-[#57534E]">
              We will send these to the cafe on WhatsApp.
            </p>

            <dl className="my-8 divide-y divide-[#E7E5E4] border-y border-[#E7E5E4]">
              {FIELDS.map((f) => (
                <div key={f.id} className="flex justify-between gap-6 py-3">
                  <dt className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.16em] text-[#57534E]">
                    {f.label}
                  </dt>
                  <dd className="font-['General_Sans'] font-medium">{values[f.id]}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={confirm}
                className="min-h-[52px] flex-1 rounded-full bg-[#0C0A09] px-8 font-['General_Sans'] font-medium text-white transition-colors hover:bg-[#A16207] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/40"
              >
                Send on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setStage('form')}
                className="min-h-[52px] flex-1 rounded-full border border-[#D6D3D1] px-8 font-['General_Sans'] transition-colors hover:bg-[#F5F5F4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/30"
              >
                Go back and edit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
