import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services — Aadhi Bhairava Cow Farm',
  description: 'Explore the full range of services from Aadhi Bhairava Cow Farm — fresh milk delivery, cows for sale, farm consultancy, veterinary referrals, and more.',
};

const services = [
  {
    id: 1,
    emoji: '🥛',
    title: 'Fresh Milk Supply',
    subtitle: 'Daily Farm-to-Door Delivery',
    desc: 'Pure, unadulterated cow milk delivered fresh every morning. Available in full-cream, toned, and premium A2 Gir varieties. Starting at ₹40/litre.',
    features: ['Daily morning delivery', 'Multiple milk variants', 'Tested for fat & SNF', 'Subscription plans available'],
    cta: 'Order Milk',
    ctaHref: '/milk',
    gradient: 'from-emerald-600 to-emerald-800',
  },
  {
    id: 2,
    emoji: '🐄',
    title: 'Cows for Sale',
    subtitle: 'Premium Dairy Breeds',
    desc: 'Purchase high-yield Gir, Jersey, Holstein Friesian, and crossbred cows directly from our farm. All cows come with health certificates and breed documentation.',
    features: ['Gir, Jersey & HF breeds', 'Health certified', 'Vaccination records provided', 'Transport assistance'],
    cta: 'Enquire About Cows',
    ctaHref: '/contact',
    gradient: 'from-amber-600 to-amber-800',
  },
  {
    id: 3,
    emoji: '🌾',
    title: 'Bulk Dairy Supply',
    subtitle: 'For Businesses & Institutions',
    desc: 'Reliable bulk milk and dairy product supply for hotels, restaurants, schools, and dairy processors. Consistent quality with cold-chain compliance.',
    features: ['500L+ daily capacity', 'Cold-chain assured', 'Invoice with GSTIN', 'Long-term contracts welcome'],
    cta: 'Discuss Bulk Order',
    ctaHref: '/contact',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 4,
    emoji: '🏡',
    title: 'Farm Visits & Tours',
    subtitle: 'Educational & Recreational',
    desc: 'Experience modern dairy farming firsthand. Ideal for schools, families, and agri-tourism enthusiasts. Learn about cow care, milking, and sustainable practices.',
    features: ['Group bookings welcome', 'Guided farm tour', 'Milking session demo', 'Open on weekends'],
    cta: 'Book a Visit',
    ctaHref: '/contact',
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 5,
    emoji: '🩺',
    title: 'Veterinary Referrals',
    subtitle: 'Expert Cattle Health Network',
    desc: 'We maintain a network of experienced bovine veterinarians. We can refer you to certified vets in Erode, Bhavani, and surrounding areas for cattle health emergencies.',
    features: ['Emergency vet referrals', 'Vaccination scheduling', 'Deworming consultations', 'Breeding guidance'],
    cta: 'Contact Us',
    ctaHref: '/contact',
    gradient: 'from-red-600 to-red-800',
  },
  {
    id: 6,
    emoji: '📋',
    title: 'Farm Management Consultancy',
    subtitle: 'For New & Existing Dairy Farmers',
    desc: 'Benefit from our 20+ years of dairy farming expertise. We offer consultancy on herd management, feed optimization, milk yield improvement, and compliance.',
    features: ['Site visits available', 'Feed & nutrition planning', 'Herd health programs', 'Record-keeping setup'],
    cta: 'Get Consultancy',
    ctaHref: '/contact',
    gradient: 'from-slate-600 to-slate-800',
  },
];

const certifications = [
  { label: 'FSSAI Certified', detail: 'Food Safety & Standards Authority of India' },
  { label: 'Legal Metrology', detail: 'Compliance with Weights & Measures Act' },
  { label: 'GST Registered', detail: 'GSTIN registered for B2B transactions' },
  { label: 'Aadhar-seeded', detail: 'All farm employees formally registered' },
];

export default function ServicesPage() {
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
            <Link href="/about" className="hover:text-amber-300 transition">About</Link>
            <Link href="/milk" className="hover:text-amber-300 transition">Milk</Link>
            <Link href="/services" className="text-amber-300">Services</Link>
            <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider shadow transition">
            Admin Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            What We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Complete Dairy<br />
            <span className="text-amber-300">Farm Services</span>
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-xl mx-auto">
            From fresh milk delivery to farm tours, we offer a comprehensive suite of dairy farm services tailored to families, businesses, and fellow farmers alike.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl font-extrabold text-slate-800">Everything You Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <div key={s.id} className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
                <div className={`bg-gradient-to-br ${s.gradient} text-white p-6 space-y-2`}>
                  <div className="text-4xl">{s.emoji}</div>
                  <h3 className="text-lg font-extrabold">{s.title}</h3>
                  <p className="text-xs opacity-80 font-semibold uppercase tracking-wider">{s.subtitle}</p>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  <ul className="space-y-1.5 flex-1">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={s.ctaHref}
                    className="block w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest text-center shadow transition mt-4"
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Compliance</span>
            <h2 className="text-2xl font-extrabold text-slate-800">Certified & Compliant</h2>
            <p className="text-sm text-slate-500">All our operations conform to Indian food safety and dairy industry regulations.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((c) => (
              <div key={c.label} className="bg-white border border-emerald-100 rounded-2xl p-5 text-center shadow-sm">
                <p className="font-bold text-emerald-700 text-sm">{c.label}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Ready to Get Started?</h2>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto leading-relaxed">
            Contact us today on WhatsApp for the fastest response. We&apos;ll help you find the right service for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919344460611?text=Hello!%20I%20want%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-400 hover:bg-green-500 text-slate-900 font-bold px-8 py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition"
            >
              📱 WhatsApp Us
            </a>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm uppercase tracking-wider transition">
              View Contact Info
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
