import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Aadhi Bhairava Cow Farm — Enterprise Dairy Farm Management System',
  description: 'Healthy Cows, Happy Future. Intelligent dairy farm management platform for livestock tracking, milk production, veterinary health, compliance, and enterprise financials.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* 1. Header & Navigation Bar */}
      <header className="bg-[#1B4332] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Aadhi Bhairava Cow Farm Logo" className="w-11 h-11 rounded-full border-2 border-amber-400 bg-white p-0.5 object-cover" />
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">Aadhi Bhairava Cow Farm</span>
              <span className="text-xs text-emerald-200 block font-normal">Healthy Cows, Happy Future</span>
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-6 text-xs font-semibold uppercase tracking-wider text-emerald-100">
            <Link href="/about" className="hover:text-amber-300 transition">About</Link>
            <Link href="/milk" className="hover:text-amber-300 transition">Fresh Milk</Link>
            <Link href="/cows-for-sale" className="hover:text-amber-300 transition">Cows for Sale</Link>
            <Link href="/services" className="hover:text-amber-300 transition">Services</Link>
            <Link href="/gallery" className="hover:text-amber-300 transition">Gallery</Link>
            <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/login" className="bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-xs tracking-wider uppercase transition">
              Sign In
            </Link>
            <Link href="/login" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs tracking-wider uppercase shadow transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-gradient-to-b from-[#1B4332] to-[#2D6A4F] text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-900/80 border border-emerald-600 px-3 py-1 rounded-full text-xs font-medium text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>Enterprise Dairy Management Platform</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Smart Dairy.<br />
              <span className="text-amber-300">Smarter Farming.</span>
            </h1>
            <p className="text-slate-200 text-base leading-relaxed max-w-xl">
              Empowering modern dairy operations with intelligent livestock tracking, milk production telemetry, veterinary clinical logs, inventory control, regulatory compliance, and enterprise financial ledgers.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/login" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition">
                GET STARTED
              </Link>
              <a href="#features" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm uppercase tracking-wider transition">
                LEARN MORE
              </a>
            </div>
          </div>

          {/* Hero Live Metric Display */}
          <div className="bg-emerald-950/60 border border-emerald-600/40 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
              <div className="flex items-center space-x-3">
                <img src="/logo.png" alt="Emblem" className="w-10 h-10 rounded-full border border-amber-400 object-cover" />
                <div>
                  <h2 className="text-sm font-bold text-white">Live Farm Telemetry</h2>
                  <p className="text-xs text-emerald-300">Aadhi Bhairava Central Monitor</p>
                </div>
              </div>
              <span className="bg-emerald-800 text-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold uppercase">Active</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-900/40 border border-emerald-700/50 p-4 rounded-xl">
                <p className="text-xs text-emerald-300 font-medium uppercase">Daily Milk Collection</p>
                <p className="text-2xl font-extrabold text-white mt-1">2,850 L</p>
                <p className="text-xs text-emerald-400 mt-1">Fat 4.2% | SNF 8.5%</p>
              </div>
              <div className="bg-emerald-900/40 border border-emerald-700/50 p-4 rounded-xl">
                <p className="text-xs text-emerald-300 font-medium uppercase">Total Cattle Herd</p>
                <p className="text-2xl font-extrabold text-white mt-1">450 Head</p>
                <p className="text-xs text-amber-300 mt-1">Gir, Sahiwal, Murrah</p>
              </div>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-700/50 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-300 uppercase font-medium">Compliance Readiness</p>
                <p className="text-sm font-semibold text-white mt-0.5">FSSAI & MeitY DPDP Aligned</p>
              </div>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs px-3 py-1 rounded-md font-bold">Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Section */}
      <section id="about" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">About Our Platform</span>
            <h2 className="text-3xl font-bold text-slate-900">Modern Technology Rooted in Agricultural Excellence</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Aadhi Bhairava Cow Farm brings enterprise software engineering to dairy management. Built with Next.js 15, Node.js REST API, PostgreSQL, and Prisma ORM, our platform streamlines herd management, milk collection quality logs, veterinary care, and financial accounting.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Statistics Section */}
      <section className="py-12 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-[#1B4332]">100%</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Data Traceability</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-[#1B4332]">4.2°C</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Target Cold Chain</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-[#1B4332]">27</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Domain Data Models</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-extrabold text-[#1B4332]">RBAC</p>
            <p className="text-xs text-slate-500 uppercase font-semibold mt-1">Permission Security</p>
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section id="features" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Core Capabilities</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">Comprehensive Enterprise Modules</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-[#1B4332] text-white rounded-lg flex items-center justify-center font-bold text-lg">🐄</div>
              <h3 className="text-lg font-bold text-slate-900">Livestock Registry</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Ear-tag identification, breed profiling (Gir, Sahiwal, Ongole, Murrah), weight logs, age, color, and maternal lineage tracking.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-[#1B4332] text-white rounded-lg flex items-center justify-center font-bold text-lg">🥛</div>
              <h3 className="text-lg font-bold text-slate-900">Milk Yield & Quality</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Morning & evening shift collection records, Fat %, SNF %, temperature logs, and commercial customer dispatches.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-[#1B4332] text-white rounded-lg flex items-center justify-center font-bold text-lg">🩺</div>
              <h3 className="text-lg font-bold text-slate-900">Veterinary Clinical Care</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Vaccination schedules, clinical diagnosis diaries, antibiotic treatments, and withdrawal period monitoring.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-[#1B4332] text-white rounded-lg flex items-center justify-center font-bold text-lg">🧬</div>
              <h3 className="text-lg font-bold text-slate-900">Breeding & Artificial Insemination</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                AI breeding dates, bull tag association, expected calving date calculations, pregnancy status, and calf history logs.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-[#1B4332] text-white rounded-lg flex items-center justify-center font-bold text-lg">📦</div>
              <h3 className="text-lg font-bold text-slate-900">Inventory & Feed Supply</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Green fodder, dry feed, concentrate stock levels, minimum reorder alerts, veterinary medicines, and supplier orders.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 bg-[#1B4332] text-white rounded-lg flex items-center justify-center font-bold text-lg">📊</div>
              <h3 className="text-lg font-bold text-slate-900">Financial Ledgers & Payroll</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Income and expense tracking, customer invoices, employee attendance, and basic salary/allowance calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Livestock Management Focus */}
      <section id="livestock" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Herds & Breeds</span>
            <h2 className="text-3xl font-bold text-slate-900">Indigenous & Commercial Breed Management</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Maintain exact digital records of indigenous Indian cattle breeds including Gir, Sahiwal, Hallikar, Ongole, HF Cross, and Murrah Buffaloes. Every animal profile contains unique ear-tag registration, vaccination history, and lactating status.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Breeds Supported</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 text-[#1B4332] rounded-lg font-semibold border border-emerald-100">Gir Breed (Desi)</div>
              <div className="p-3 bg-emerald-50 text-[#1B4332] rounded-lg font-semibold border border-emerald-100">Sahiwal Breed</div>
              <div className="p-3 bg-emerald-50 text-[#1B4332] rounded-lg font-semibold border border-emerald-100">Hallikar & Ongole</div>
              <div className="p-3 bg-emerald-50 text-[#1B4332] rounded-lg font-semibold border border-emerald-100">Murrah Buffalo</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Milk Management Focus */}
      <section id="milk" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-emerald-900 text-white p-8 rounded-xl space-y-4 shadow-md">
            <h3 className="text-lg font-bold text-amber-300">Shift-wise Collection Log</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Log daily morning and evening milk collection volumes directly from milking parlors. Record SNF (Solid-Not-Fat) percentages and fat metrics for automated quality classification.
            </p>
            <div className="border-t border-emerald-700 pt-4 flex justify-between text-xs">
              <span>Morning Shift: 05:30 AM</span>
              <span>Evening Shift: 05:00 PM</span>
            </div>
          </div>
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Quality Assurance</span>
            <h2 className="text-3xl font-bold text-slate-900">Cold Chain & Fat/SNF Tracking</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ensure continuous milk quality assurance with digital temperature logs and customer dispatch invoices. Data linkages support complete batch traceability from herd collection to commercial customer delivery.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Animal Health & Vet */}
      <section id="health" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Veterinary Care</span>
            <h2 className="text-3xl font-bold text-slate-900">Clinical Diagnosis & Vaccination Diaries</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-xs">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Vaccination Schedules</h3>
              <p className="text-slate-600">Track FMD, HS, BQ, and Brucellosis vaccination due dates with automatic reminder alerts.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Treatment Withdrawal Logs</h3>
              <p className="text-slate-600">Enforce mandatory milk withdrawal periods for cows under antibiotic treatment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">Doctor Clinical Diaries</h3>
              <p className="text-slate-600">Maintain clinical examination records, disease diagnoses, and prescription logs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Compliance Section */}
      <section id="compliance" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Statutory Alignment</span>
            <h2 className="text-3xl font-bold text-slate-900">India Regulatory & Compliance Readiness</h2>
            <p className="text-slate-600 text-sm">
              Our architecture incorporates compliance readiness features for applicable Indian statutory regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#1B4332] uppercase">FSSAI Food Safety</span>
              <p className="text-slate-700 font-semibold text-sm">Milk Hygiene & Chilling</p>
              <p className="text-slate-600">Supports FBO license registration fields, chilling temperature logs (4°C limit), and batch quality tracking.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#1B4332] uppercase">MeitY DPDP Act 2023</span>
              <p className="text-slate-700 font-semibold text-sm">Data Protection & Privacy</p>
              <p className="text-slate-600">Enforces RBAC access control, audit logging, Privacy Policy, Terms, and Data Retention policies.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-[#1B4332] uppercase">GST & Invoicing</span>
              <p className="text-slate-700 font-semibold text-sm">Taxation Ledgers</p>
              <p className="text-slate-600">Configurable GSTIN metadata, taxable values, CGST/SGST/IGST breakdowns, and customer invoices.</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/privacy" className="text-xs font-bold text-[#1B4332] underline hover:text-emerald-700">
              Read Our Full India Compliance Readiness Matrix & Data Privacy Policy →
            </Link>
          </div>
        </div>
      </section>

      {/* 13. FAQ Section */}
      <section id="faq" className="py-16 bg-slate-100 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Questions & Answers</span>
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">What credentials should I use for testing?</h3>
              <p className="text-slate-600">In the development environment, sign in with email <strong>admin@cowfarm.com</strong> and password <strong>admin123</strong>.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Does the software replace government licensing?</h3>
              <p className="text-slate-600">No. The software provides digital recordkeeping tools. Actual FSSAI licenses or statutory filings must be obtained through official government portals.</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">How is file and document storage handled?</h3>
              <p className="text-slate-600">Files and images are stored in AWS S3 buckets (`cowfarm-assets`) with automatic local disk fallback (`uploads/`) when cloud storage is offline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. Contact Section */}
      <section id="contact" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Get in Touch</span>
          <h2 className="text-3xl font-bold text-slate-900">Contact Aadhi Bhairava Dairy Operations</h2>
          <p className="text-slate-600 text-xs">
            For operational inquiries, farm management consultation, or system technical support:
          </p>
          <div className="inline-block bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs text-slate-700 font-medium">
            <p>Email: <strong>support@aadhibhairavacowfarm.com</strong> (Configure in Settings)</p>
            <p className="mt-1">Location: Aadhi Bhairava Cow Farm Headquarters, India</p>
          </div>
        </div>
      </section>

      {/* 15. Call To Action (CTA) */}
      <section className="bg-[#1B4332] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to Modernize Your Dairy Operations?</h2>
          <p className="text-emerald-100 text-sm">
            Access intelligent cattle tracking, milk yield metrics, veterinary clinical diaries, and statutory compliance ledgers.
          </p>
          <div>
            <Link href="/login" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3 rounded-lg text-sm tracking-wider uppercase inline-block shadow-lg transition">
              GET STARTED NOW
            </Link>
          </div>
        </div>
      </section>

      {/* 16. Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Emblem" className="w-8 h-8 rounded-full border border-amber-400 object-cover" />
              <span className="font-bold text-white text-sm">Aadhi Bhairava Cow Farm</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Enterprise Dairy Farm Management Platform — Healthy Cows, Happy Future.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider">Compliance & Legal</h3>
            <ul className="space-y-1 text-slate-400">
              <li><Link href="/privacy" className="hover:text-amber-300">Privacy Policy (DPDP Act 2023)</Link></li>
              <li><Link href="/terms" className="hover:text-amber-300">Terms of Service</Link></li>
              <li><Link href="/data-policy" className="hover:text-amber-300">Data Protection & Retention Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-semibold text-xs uppercase tracking-wider">Account Access</h3>
            <ul className="space-y-1 text-slate-400">
              <li><Link href="/login" className="hover:text-amber-300">Admin Sign In</Link></li>
              <li><a href="#features" className="hover:text-amber-300">Platform Features</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-6 text-center text-slate-500">
          <p>© 2026 Velan. All Rights Reserved. Designed, Architected & Developed by VELAN, MCA, Software Engineer.</p>
        </div>
      </footer>
    </div>
  );
}
