import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Our Farm — Aadhi Bhairava Cow Farm',
  description: 'Learn about Aadhi Bhairava Cow Farm — our heritage, values, sustainable practices, and dedication to pure, healthy dairy farming in India.',
};

const milestones = [
  { year: '2005', title: 'Farm Founded', desc: 'Started with 12 cows and a dream to deliver pure milk to local families.' },
  { year: '2010', title: 'Herd Expansion', desc: 'Expanded to 60+ Gir and Jersey crossbreeds with modern milking infrastructure.' },
  { year: '2016', title: 'FSSAI Certified', desc: 'Received FSSAI food safety certification ensuring hygienic standards.' },
  { year: '2020', title: 'Enterprise System', desc: 'Adopted digital management systems for livestock tracking and reporting.' },
  { year: '2026', title: 'Smart Dairy Launch', desc: 'Deployed AI-powered Smart Dairy Management for 120+ head of cattle.' },
];

const values = [
  { emoji: '🐄', title: 'Animal Welfare First', desc: 'Our cows receive compassionate care — veterinary attention, spacious pasture, and clean feed.' },
  { emoji: '🌿', title: 'Sustainable Practices', desc: 'Bio-waste composting, rainwater harvesting, and solar-powered milking operations.' },
  { emoji: '🥛', title: 'Purity Guaranteed', desc: 'No additives, no preservatives. Fresh milk tested daily for fat, SNF, and hygiene standards.' },
  { emoji: '🏅', title: 'FSSAI Compliant', desc: 'Fully certified under FSSAI food safety regulations and Legal Metrology Act.' },
  { emoji: '👨‍👩‍👧‍👦', title: 'Community Impact', desc: 'Employing 25+ local families and supporting village welfare programs.' },
  { emoji: '📊', title: 'Data-Driven Farming', desc: 'Technology-first approach: GPS tagging, digital health records, and predictive analytics.' },
];

const team = [
  { name: 'Velan', role: 'Founder & Farm Owner', description: 'MCA Graduate, Software Engineer, and dairy enthusiast managing 120+ head with enterprise-grade systems.' },
  { name: 'Dr. Selvam', role: 'Chief Veterinarian', description: 'BVSc (Gold Medalist) with 18 years of bovine medicine expertise covering vaccination, reproduction, and herd health.' },
  { name: 'Murugan', role: 'Senior Farm Manager', description: 'Over 20 years managing feed, milking schedules, and operational workflows for large cattle herds.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <header className="bg-[#1B4332] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Aadhi Bhairava Cow Farm" className="w-10 h-10 rounded-full border-2 border-amber-400 bg-white p-0.5 object-cover" />
            <div>
              <span className="text-lg font-bold text-white block">Aadhi Bhairava Cow Farm</span>
              <span className="text-xs text-emerald-200 block">Healthy Cows, Happy Future</span>
            </div>
          </Link>
          <nav className="hidden md:flex space-x-6 text-xs font-semibold text-emerald-100 uppercase tracking-wider">
            <Link href="/" className="hover:text-amber-300 transition">Home</Link>
            <Link href="/about" className="text-amber-300">About</Link>
            <Link href="/milk" className="hover:text-amber-300 transition">Milk</Link>
            <Link href="/services" className="hover:text-amber-300 transition">Services</Link>
            <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider shadow transition">
            Admin Login
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            A Legacy of Pure Dairy,<br />
            <span className="text-amber-300">Built With Passion</span>
          </h1>
          <p className="text-slate-200 text-base leading-relaxed max-w-2xl mx-auto">
            For over two decades, Aadhi Bhairava Cow Farm has stood for purity, compassion, and excellence in dairy farming. From 12 cows to 120+, our journey is one of heartfelt dedication to quality and community.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
              Rooted in Tradition,<br />Driven by Innovation
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Aadhi Bhairava Cow Farm was established in 2005 with a simple mission: provide fresh, unadulterated cow milk to families who care about what they consume. Named after the divine form of Lord Shiva — a protector of the innocent — our farm embodies protection, purity, and prosperity.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We breed and maintain premium Gir, Jersey, and HF crossbred cows, carefully selected for high milk yield and resilience. Every cow is named, cared for like family, and monitored through our enterprise-grade Smart Dairy Management System.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center min-w-[120px]">
                <p className="text-2xl font-extrabold text-emerald-700">120+</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Head of Cattle</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center min-w-[120px]">
                <p className="text-2xl font-extrabold text-amber-600">2,850 L</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Daily Milk Yield</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center min-w-[120px]">
                <p className="text-2xl font-extrabold text-blue-600">20+</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">Years of Legacy</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-3xl p-10 text-white text-center shadow-2xl space-y-4">
              <div className="text-6xl">🐄</div>
              <h3 className="text-xl font-bold">Aadhi Bhairava Cow Farm</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                &ldquo;Pure milk from happy, healthy cows — that&rsquo;s our promise to every family we serve.&rdquo;
              </p>
              <div className="pt-4 border-t border-emerald-600">
                <p className="text-sm font-bold text-amber-300">— Velan, Founder</p>
                <p className="text-xs text-emerald-300 mt-1">MCA | Software Engineer | Farm Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Our Values</span>
            <h2 className="text-3xl font-extrabold text-slate-800">What We Stand For</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Every decision at our farm is guided by a deep respect for animals, people, and the planet.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-3">
                <div className="text-3xl">{v.emoji}</div>
                <h3 className="text-sm font-bold text-slate-800">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Our Journey</span>
            <h2 className="text-3xl font-extrabold text-slate-800">Two Decades of Growth</h2>
          </div>
          <div className="relative space-y-8">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-emerald-100"></div>
            {milestones.map((m) => (
              <div key={m.year} className="relative flex gap-6 items-start">
                <div className="w-16 h-16 rounded-full bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center shadow-md z-10 shrink-0">
                  {m.year}
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex-1 shadow-sm">
                  <h3 className="font-bold text-slate-800 text-sm">{m.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl font-extrabold text-slate-800">The People Behind the Farm</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center space-y-4 hover:shadow-md transition">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{t.name}</h3>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">{t.role}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Come Visit Our Farm</h2>
          <p className="text-emerald-100 text-sm leading-relaxed max-w-xl mx-auto">
            We welcome visits from families, schools, and dairy enthusiasts. Experience life on a modern dairy farm firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm uppercase tracking-wider shadow transition">
              Get in Touch
            </Link>
            <Link href="/milk" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm uppercase tracking-wider transition">
              Our Milk Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        <p>© 2026 Aadhi Bhairava Cow Farm. All Rights Reserved.</p>
        <p className="mt-1">Designed & Developed by <span className="text-slate-200 font-semibold">Velan | MCA • Software Engineer</span></p>
      </footer>
    </div>
  );
}
