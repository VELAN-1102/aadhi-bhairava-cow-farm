import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Data Policy & Retention | Aadhi Bhairava Cow Farm',
  description: 'Data Retention, Backup, and Anonymization Policy for Aadhi Bhairava Cow Farm Enterprise Platform.',
};

export default function DataPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 sm:p-12 space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1B4332] mb-2">Data Protection & Retention Policy</h2>
            <p className="text-xs text-slate-500 pb-4 border-b border-slate-100">
              Last Updated: September 15, 2026
            </p>
          </div>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Data Retention Periods</h3>
            <p>
              To maintain statutory compliance and enterprise auditability, operational data is retained according to the following schedule:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
              <li><strong>Financial Invoices & GST Data:</strong> Retained for 8 years per Indian Tax Laws.</li>
              <li><strong>Milk Quality & Batch Records:</strong> Retained for 3 years for food safety traceability.</li>
              <li><strong>Livestock Medical & Breeding Records:</strong> Retained for the full lifetime of the animal plus 2 years.</li>
              <li><strong>System Audit Logs:</strong> Retained for 5 years for security auditing.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Backup & Disaster Recovery Architecture</h3>
            <p>
              Database backups are executed on PostgreSQL using WAL archiving and daily automated snapshot retention in encrypted AWS S3 buckets (`cowfarm-assets`).
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Role-Based Access Control (RBAC)</h3>
            <p>
              Strict permission boundaries prevent unauthorized data access. System actions are logged in immutable audit tables containing user ID, timestamp, action type, and IP address.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 text-center text-xs">
        <p>© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.</p>
      </footer>
    </div>
  );
}
