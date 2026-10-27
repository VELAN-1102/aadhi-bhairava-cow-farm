import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cows for Sale — Aadhi Bhairava Cow Farm',
  description: 'Buy premium dairy cows from Aadhi Bhairava Cow Farm. Gir, Jersey, HF, and crossbred cows for sale with health certificates and vaccination records.',
};

const cowsForSale = [
  {
    id: 'GR-480',
    breed: 'Gir',
    age: '4 years',
    dailyYield: '18–22 L',
    lactations: 2,
    status: 'AVAILABLE',
    price: '₹85,000',
    health: 'Excellent',
    description: 'Pure Gir breed, high A2 milk yield, gentle temperament. Fully vaccinated with FMD, HS, and BQ boosters.',
    emoji: '🐄',
  },
  {
    id: 'JS-412',
    breed: 'Jersey',
    age: '3 years',
    dailyYield: '14–18 L',
    lactations: 1,
    status: 'AVAILABLE',
    price: '₹68,000',
    health: 'Good',
    description: 'Jersey crossbred heifer, first lactation. Good butterfat content (5.8%). Excellent for family dairy use.',
    emoji: '🐮',
  },
  {
    id: 'HF-301',
    breed: 'Holstein Friesian',
    age: '5 years',
    dailyYield: '22–28 L',
    lactations: 3,
    status: 'AVAILABLE',
    price: '₹95,000',
    health: 'Excellent',
    description: 'High-yield HF breed, third lactation, peak producer. Ideal for commercial dairy operations.',
    emoji: '🐄',
  },
  {
    id: 'GRX-502',
    breed: 'Gir × Jersey Cross',
    age: '2.5 years',
    dailyYield: '16–20 L',
    lactations: 1,
    status: 'RESERVED',
    price: '₹72,000',
    health: 'Excellent',
    description: 'Young heifer with strong genetic heritage. Combines A2 milk quality of Gir with high-yield trait of Jersey.',
    emoji: '🐮',
  },
  {
    id: 'SW-210',
    breed: 'Sahiwal',
    age: '4 years',
    dailyYield: '10–14 L',
    lactations: 2,
    status: 'AVAILABLE',
    price: '₹58,000',
    health: 'Good',
    description: 'Indigenous Sahiwal breed, known for heat tolerance and disease resistance. Excellent for small farms.',
    emoji: '🐄',
  },
  {
    id: 'GR-524',
    breed: 'Gir',
    age: '6 years',
    dailyYield: '16–20 L',
    lactations: 4,
    status: 'AVAILABLE',
    price: '₹75,000',
    health: 'Good',
    description: 'Mature Gir cow with excellent breeding history. Four calving records. Strong constitution, easy to manage.',
    emoji: '🐄',
  },
];

const inclusions = [
  '✅ Full vaccination record (FMD, HS, BQ, Brucella)',
  '✅ Individual health certificate from licensed vet',
  '✅ Breed registration document',
  '✅ Pregnancy status documentation (if applicable)',
  '✅ 7-day post-purchase support call',
  '✅ Transport assistance within Erode district',
];

export default function CowsForSalePage() {
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
        <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            🐄 Premium Livestock
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Quality Dairy Cows<br />
            <span className="text-amber-300">For Sale</span>
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-xl mx-auto">
            Buy directly from our farm. All cows are health-certified, vaccinated, and come with full documentation. We also assist with transport.
          </p>
          <a
            href="https://wa.me/919344460611?text=Hi!%20I%20am%20interested%20in%20buying%20a%20cow%20from%20Aadhi%20Bhairava%20Farm."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-400 hover:bg-green-500 text-slate-900 font-bold px-8 py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition"
          >
            📱 Enquire on WhatsApp
          </a>
        </div>
      </section>

      {/* Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Current Listings</span>
            <h2 className="text-3xl font-extrabold text-slate-800">Available Cattle</h2>
            <p className="text-slate-500 text-sm">All listed cows have been health-screened and are ready for immediate sale.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cowsForSale.map((cow) => (
              <div key={cow.id} className="bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white space-y-2 relative">
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      cow.status === 'AVAILABLE' 
                        ? 'bg-green-400 text-slate-900' 
                        : 'bg-orange-400 text-slate-900'
                    }`}>
                      {cow.status}
                    </span>
                  </div>
                  <div className="text-5xl">{cow.emoji}</div>
                  <div>
                    <h3 className="font-extrabold text-lg">{cow.breed} Cow</h3>
                    <p className="text-emerald-300 text-xs font-bold">Tag: {cow.id}</p>
                  </div>
                  <div className="text-2xl font-extrabold text-amber-300">{cow.price}</div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <p className="text-sm text-slate-500 leading-relaxed">{cow.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400">Age</p>
                      <p className="text-sm font-bold text-slate-700 mt-0.5">{cow.age}</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400">Daily Yield</p>
                      <p className="text-sm font-bold text-emerald-700 mt-0.5">{cow.dailyYield}</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400">Lactations</p>
                      <p className="text-sm font-bold text-slate-700 mt-0.5">{cow.lactations}</p>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-xl p-3 text-center">
                      <p className="text-xs text-slate-400">Health</p>
                      <p className="text-sm font-bold text-green-600 mt-0.5">{cow.health}</p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/919344460611?text=Hi!%20I%20am%20interested%20in%20buying%20cow%20${encodeURIComponent(cow.id)}%20(${encodeURIComponent(cow.breed)})%20listed%20at%20${encodeURIComponent(cow.price)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto block w-full font-bold py-3 rounded-xl text-xs uppercase tracking-widest text-center shadow transition ${
                      cow.status === 'AVAILABLE'
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed pointer-events-none'
                    }`}
                  >
                    {cow.status === 'AVAILABLE' ? 'Enquire Now' : 'Currently Reserved'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">What You Get</span>
            <h2 className="text-2xl font-extrabold text-slate-800">Every Purchase Includes</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {inclusions.map((item, i) => (
              <div key={i} className="bg-white border border-emerald-100 rounded-xl px-5 py-4 text-sm text-slate-700 font-medium shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order */}
      <section className="py-16 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">Don&apos;t See What You Need?</h2>
          <p className="text-emerald-100 text-sm leading-relaxed max-w-lg mx-auto">
            We can source specific breeds, age groups, and milk yields from our trusted network of partner farms. Contact us with your exact requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919344460611?text=I%20have%20a%20specific%20cow%20requirement.%20Can%20you%20help?"
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
