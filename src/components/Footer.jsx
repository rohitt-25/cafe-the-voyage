import React from 'react';
import { PHONE, PHONE_HREF, WHATSAPP } from '../lib/design';

/**
 * Contact block. This is the page's real job — a visitor who gets here wants
 * the number, the address and the hours, so all three are plain text at full
 * size, never hidden behind an icon or a breakpoint.
 */

const HOURS = [
  ['Monday — Thursday', '9:00 AM – 11:00 PM'],
  ['Friday — Saturday', '9:00 AM – 12:00 AM'],
  ['Sunday', '9:00 AM – 11:00 PM'],
];

const MAPS =
  'https://www.google.com/maps/search/?api=1&query=Cafe+The+Voyage+Koregaon+Park+Pune';

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--bg)] pt-20 pb-12 md:pt-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <p className="font-['Satoshi'] text-2xl font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              Cafe — The Voyage
            </p>
            <p className="mt-4 max-w-[34ch] font-['General_Sans'] leading-relaxed text-[color:var(--ink-soft)]">
              A travel-themed cafe in Koregaon Park. Filter coffee, all-day brunch, and garden
              seating worth staying in.
            </p>

            <a
              href={PHONE_HREF}
              className="mt-8 block font-['Satoshi'] text-3xl font-bold tracking-[-0.02em] text-[color:var(--ink)] hover:text-[#A16207] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/30 rounded-lg"
            >
              {PHONE}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#A16207] px-7 font-['General_Sans'] font-medium text-white transition-colors hover:bg-[#855206] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/40"
            >
              Message us on WhatsApp
            </a>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
              Find us
            </h2>
            <address className="mt-5 not-italic font-['General_Sans'] leading-relaxed text-[color:var(--ink)]">
              Ground Floor, Ashiyana Park,
              <br />
              Lane 5, Koregaon Park,
              <br />
              Pune, Maharashtra 411001
            </address>
            <a
              href={MAPS}
              target="_blank"
              rel="noreferrer"
              className="link-sweep mt-5 inline-block font-['General_Sans'] text-[color:var(--ink)] hover:text-[#A16207] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/30 rounded"
            >
              Open in Google Maps →
            </a>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
              Hours
            </h2>
            <table className="mt-5 w-full text-left">
              <tbody>
                {HOURS.map(([days, time]) => (
                  <tr key={days} className="border-b border-[color:var(--line)] last:border-0">
                    <th scope="row" className="py-2.5 pr-4 font-['General_Sans'] font-normal text-[color:var(--ink)]">
                      {days}
                    </th>
                    <td className="py-2.5 text-right font-['JetBrains_Mono'] text-[13px] text-[color:var(--ink-soft)] tabular-nums">
                      {time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[color:var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
            © {new Date().getFullYear()} Cafe — The Voyage
          </p>
          <p className="font-['JetBrains_Mono'] text-[12px] text-[color:var(--ink-soft)]">
            Hours verified from the Google listing on{' '}
            <time dateTime="2026-08-16">16 Aug 2026</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
