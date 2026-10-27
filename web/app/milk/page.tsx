import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fresh Cow Milk — ₹40/Litre | Aadhi Bhairava Cow Farm',
  description: 'Order fresh, pure cow milk directly from our farm. Unadulterated, FSSAI-certified, farm-to-home delivery. Priced at ₹40 per litre.',
};

const milkProducts = [
  {
    id: 1,
    name: 'Fresh Full-Cream Milk',
    price: 40,
    unit: 'per litre',
    fat: '6.5%',
    snf: '9.2%',
    tag: 'Best Seller',
    tagColor: 'bg-amber-400 text-slate-900',
    desc: 'Thick, rich full-cream milk from our free-range Gir cows. Perfect for chai, sweets, and everyday consumption.',
    emoji: '🥛',
  },
  {
    id: 2,
    name: 'Standardised Toned Milk',
    price: 36,
    unit: 'per litre',
    fat: '3.0%',
    snf: '8.5%',
    tag: 'Healthy Choice',
    tagColor: 'bg-emerald-100 text-emerald-800',
    desc: 'Light and nutritious toned milk, ideal for diet-conscious families. Perfect for direct consumption and coffee.',
    emoji: '💧',
  },
  {
    id: 3,
    name: 'Premium A2 Gir Milk',
    price: 70,
    unit: 'per litre',
    fat: '7.0%',
    snf: '9.5%',
    tag: 'Premium',
    tagColor: 'bg-purple-100 text-purple-800',
    desc: 'Pure A2 beta-casein milk from our purebred Gir cows. Rich, digestible, and nutritionally superior.',
    emoji: '⭐',
  },
];

const benefits = [
  { icon: '🚫', title: 'No Additives', desc: 'Zero preservatives, artificial colors, or hormone injections.' },
  { icon: '🧪', title: 'Daily Tested', desc: 'Every batch tested for fat %, SNF, and pathogen safety.' },
  { icon: '❄️', title: 'Cold-Chain Assured', desc: 'Chilled and sealed within 2 hours of milking.' },
  { icon: '🏅', title: 'FSSAI Certified', desc: 'Fully compliant with Food Safety and Standards Authority of India.' },
  { icon: '🌿', title: 'Naturally Fed', desc: 'Our cows graze on natural fodder and are never force-fed.' },
  { icon: '🏠', title: 'Farm to Home', desc: 'Fresh doorstep delivery every morning, 7 days a week.' },
];

const deliveryAreas = [
  'Erode', 'Bhavani', 'Gobichettipalayam', 'Perundurai', 'Anthiyur',
  'Sathyamangalam', 'Tiruppur', 'Dharapuram',
];

export default function MilkPage() {
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
            <Link href="/milk" className="text-amber-300">Milk</Link>
            <Link href="/services" className="hover:text-amber-300 transition">Services</Link>
            <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
          </nav>
          <Link href="/login" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider shadow transition">
            Admin Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-5">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            🥛 Fresh from Our Farm
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Pure Cow Milk,<br />
            <span className="text-amber-300">Starting at ₹40/Litre</span>
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-2xl mx-auto">
            Sourced directly from our 120+ healthy, well-cared-for cows. No mixing. No adulteration. Just pure, natural milk delivered fresh to your doorstep every morning.
          </p>
          <a
            href={`https://wa.me/919344460611?text=Hello!%20I%20want%20to%20order%20fresh%20cow%20milk%20from%20Aadhi%20Bhairava%20Cow%20Farm.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition"
          >
            📱 Order via WhatsApp
          </a>
        </div>
      </section>

      {/* Milk Products */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Our Products</span>
            <h2 className="text-3xl font-extrabold text-slate-800">Choose Your Milk</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">We offer multiple variants to suit every family&apos;s taste, budget, and nutritional needs.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {milkProducts.map((p) => (
              <div key={p.id} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-5 relative overflow-hidden">
                <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold ${p.tagColor}`}>
                  {p.tag}
                </div>
                <div className="text-5xl">{p.emoji}</div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-800">{p.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-emerald-700">₹{p.price}</span>
                    <span className="text-slate-400 text-sm">{p.unit}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                <div className="flex gap-4 text-xs font-semibold">
                  <div className="bg-white rounded-xl px-3 py-2 border border-slate-100">
                    <p className="text-slate-400">Fat</p>
                    <p className="text-emerald-700 font-bold">{p.fat}</p>
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2 border border-slate-100">
                    <p className="text-slate-400">SNF</p>
                    <p className="text-emerald-700 font-bold">{p.snf}</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/919344460611?text=I%20would%20like%20to%20order%20${encodeURIComponent(p.name)}%20at%20₹${p.price}/litre.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest text-center shadow transition"
                >
                  Order This Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Why Our Milk</span>
            <h2 className="text-3xl font-extrabold text-slate-800">The Aadhi Bhairava Promise</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="text-3xl">{b.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{b.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-16 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-center">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Delivery Zones</span>
            <h2 className="text-2xl font-extrabold text-slate-800">We Deliver To</h2>
            <p className="text-slate-500 text-sm">Fresh morning delivery across Erode district and surrounding areas.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {deliveryAreas.map((area) => (
              <span key={area} className="bg-white border border-emerald-200 text-emerald-800 font-semibold text-sm px-4 py-2 rounded-full shadow-sm">
                📍 {area}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Don&apos;t see your area? Contact us — we&apos;re expanding!</p>
        </div>
      </section>

      {/* Ordering CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Start Your Daily Milk Subscription</h2>
          <p className="text-emerald-100 text-sm leading-relaxed max-w-lg mx-auto">
            Connect with us on WhatsApp to set up your daily delivery schedule, choose your quantity, and get fresh milk every morning.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919344460611?text=I%20want%20to%20subscribe%20for%20daily%20fresh%20milk%20delivery."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-400 hover:bg-green-500 text-slate-900 font-bold px-8 py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition"
            >
              📱 WhatsApp: +91 93444 60611
            </a>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm uppercase tracking-wider transition">
              Other Enquiries
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
