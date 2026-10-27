import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Aadhi Bhairava Cow Farm',
  description: 'Digital Personal Data Protection (DPDP) Act 2023 compliant Privacy Policy for Aadhi Bhairava Cow Farm Enterprise Platform.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header Bar */}
      <header className="bg-[#1B4332] text-white py-6 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Aadhi Bhairava Cow Farm Logo" className="w-10 h-10 rounded-full border border-amber-400 bg-white p-0.5 object-cover" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Aadhi Bhairava Cow Farm</h1>
              <p className="text-xs text-emerald-200">Enterprise Dairy Management Platform</p>
            </div>
          </div>
          <Link href="/" className="text-sm font-medium text-amber-300 hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-[#1B4332] mb-2">Privacy Policy</h2>
          <p className="text-xs text-slate-500 mb-8 pb-4 border-b border-slate-100">
            Last Updated: September 15, 2026 | Compliant with MeitY Digital Personal Data Protection (DPDP) Act 2023 (India)
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-slate-700">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Overview & Data Fiduciary Notice</h3>
              <p>
                Aadhi Bhairava Cow Farm (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to preserving the privacy and data protection rights of our users, employees, customers, and partners in full compliance with the Digital Personal Data Protection (DPDP) Act 2023 of India. This Privacy Policy outlines how personal data is collected, processed, stored, and protected within our Enterprise Dairy Management System.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. Personal Data We Collect</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Employee & Staff Records:</strong> Full name, phone number, email address, designation, department, attendance logs, and payroll information.</li>
                <li><strong>Customer & Supplier Records:</strong> Business name, contact person name, email, phone number, physical address, and transaction invoices.</li>
                <li><strong>System Accounts:</strong> Login credentials (hashed passwords), IP addresses, browser user agent strings, and role-based access tokens.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Purpose Limitation & Processing Grounds</h3>
              <p>
                All personal data collected is processed strictly for legitimate business operational purposes, including dairy herd management, milk quality assurance, statutory payroll calculation, customer billing, and audit compliance. We do not sell, rent, or monetize personal data to third-party advertisers.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">4. Data Security Safeguards</h3>
              <p>
                We employ industry-standard technical measures to protect your data, including bcrypt password hashing, short-lived JWT access tokens with secure refresh handling, HTTPS encryption in transit, strict Role-Based Access Control (RBAC), and immutable audit logs.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-2">5. Data Principal Rights (Under DPDP Act 2023)</h3>
              <p>Users and Data Principals have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                <li>Request summary information about personal data processed by us.</li>
                <li>Request correction, completion, or updating of inaccurate personal data.</li>
                <li>Request erasure/deletion of personal data, subject to legal and statutory tax retention rules.</li>
                <li>Nominate an individual to exercise data rights in the event of incapacity.</li>
              </ul>
            </section>

            <section className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
              <h3 className="text-md font-bold text-[#1B4332] mb-1">Data Protection Officer & Grievance Contact</h3>
              <p className="text-xs text-slate-600 mb-3">
                For privacy inquiries or data rights requests, contact our designated Grievance Officer:
              </p>
              <p className="text-xs font-semibold text-slate-800">
                Data Protection & Grievance Officer: <span className="font-normal">VELAN, MCA (Software Engineer)</span><br />
                Entity: <span className="font-normal">Aadhi Bhairava Cow Farm Data Office</span><br />
                Email: <span className="font-normal">privacy@aadhibhairavacowfarm.com (Configure in System Settings)</span>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-center text-xs">
        <p>© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.</p>
      </footer>
    </div>
  );
}
