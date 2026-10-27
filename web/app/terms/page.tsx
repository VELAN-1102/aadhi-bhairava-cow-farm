import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Aadhi Bhairava Cow Farm',
  description: 'Terms of Service for Aadhi Bhairava Cow Farm Enterprise Platform.',
};

export default function TermsPage() {
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
            <h2 className="text-3xl font-extrabold text-[#1B4332] mb-2">Terms of Service</h2>
            <p className="text-xs text-slate-500 pb-4 border-b border-slate-100">
              Last Updated: September 15, 2026
            </p>
          </div>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing or using the Aadhi Bhairava Cow Farm Enterprise Management Platform (&quot;System&quot;), you agree to be bound by these Terms of Service. If you are accessing the System on behalf of a dairy enterprise or farm business, you represent that you have authority to bind that entity.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Authorized Platform Usage</h3>
            <p>
              The System is designed for managing dairy farm operations, cattle breeding records, veterinary health logs, milk collection & quality metrics, employee attendance, and financial invoices. Users must maintain account confidentiality and utilize designated role permissions appropriately.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Statutory & Regulatory Transparency</h3>
            <p>
              The System serves as an operational software recordkeeping platform. The existence of digital compliance modules within the software does not automatically grant official government regulatory certifications (e.g., FSSAI licenses or organic certifications). Farm operators remain responsible for submitting statutory filings to official authorities.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-2">4. System Availability & Maintenance</h3>
            <p>
              We strive for continuous service availability backed by automated health checks, Docker container orchestrations, and database backups. Scheduled maintenance windows will be communicated in advance.
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
