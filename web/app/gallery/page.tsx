import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery — Aadhi Bhairava Cow Farm',
  description: 'Explore our farm gallery. Photos of our cattle herd, milking operations, green pastures, and team — a window into life at Aadhi Bhairava Cow Farm.',
};

const galleryItems = [
  { id: 1, emoji: '🐄', title: 'Our Gir Cows', caption: 'Pure Gir cows in the morning pasture', category: 'Cattle' },
  { id: 2, emoji: '🥛', title: 'Milking Time', caption: 'Hygienic automated milking at 5 AM', category: 'Operations' },
  { id: 3, emoji: '🌿', title: 'Green Pastures', caption: 'Natural grass fields spanning 10 acres', category: 'Farm' },
  { id: 4, emoji: '🐄', title: 'Jersey Herd', caption: 'Our Jersey crossbred herd during grazing', category: 'Cattle' },
  { id: 5, emoji: '🩺', title: 'Veterinary Round', caption: 'Dr. Selvam conducting weekly health rounds', category: 'Healthcare' },
  { id: 6, emoji: '🌾', title: 'Feed & Fodder', caption: 'Organic silage and natural feed storage', category: 'Operations' },
  { id: 7, emoji: '🐮', title: 'Young Calves', caption: 'Newborn calves born this season', category: 'Cattle' },
  { id: 8, emoji: '📊', title: 'Smart Dairy Panel', caption: 'Our digital cattle management dashboard', category: 'Technology' },
  { id: 9, emoji: '🏡', title: 'Farm Entrance', caption: 'The main entrance to Aadhi Bhairava Cow Farm', category: 'Farm' },
  { id: 10, emoji: '👨‍🌾', title: 'Our Team', caption: 'Farm workers during the morning feeding shift', category: 'People' },
  { id: 11, emoji: '⭐', title: 'A2 Gir Milk', caption: 'Freshly collected A2 Gir milk chilled for delivery', category: 'Operations' },
  { id: 12, emoji: '🐄', title: 'HF Breed', caption: 'Our high-yield Holstein Friesian cattle', category: 'Cattle' },
];

const categories = ['All', 'Cattle', 'Operations', 'Farm', 'Healthcare', 'Technology', 'People'];

const categoryColors: Record<string, string> = {
  Cattle: 'bg-emerald-100 text-emerald-800',
  Operations: 'bg-blue-100 text-blue-800',
  Farm: 'bg-lime-100 text-lime-800',
  Healthcare: 'bg-red-100 text-red-800',
  Technology: 'bg-purple-100 text-purple-800',
  People: 'bg-amber-100 text-amber-800',
};

export default function GalleryPage() {
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
            📸 Farm Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Life at Our Farm,<br />
            <span className="text-amber-300">In Pictures</span>
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-xl mx-auto">
            A visual journey through our pastures, cattle, milking operations, and the people who make Aadhi Bhairava Cow Farm special.
          </p>
        </div>
      </section>

      {/* Category Filter Row */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <span key={cat} className="bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 font-semibold text-xs px-4 py-2 rounded-full cursor-pointer transition select-none">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryItems.map((item, index) => {
              const heights = ['h-48', 'h-56', 'h-64', 'h-48', 'h-72', 'h-56', 'h-48', 'h-64', 'h-52', 'h-56', 'h-48', 'h-64'];
              return (
                <div
                  key={item.id}
                  className={`break-inside-avoid ${heights[index % heights.length]} bg-gradient-to-br ${
                    [
                      'from-emerald-700 to-emerald-900',
                      'from-slate-700 to-slate-900',
                      'from-green-600 to-green-900',
                      'from-amber-600 to-amber-900',
                      'from-teal-700 to-teal-900',
                      'from-lime-700 to-lime-900',
                      'from-emerald-800 to-slate-900',
                      'from-indigo-700 to-indigo-900',
                      'from-green-700 to-emerald-900',
                      'from-amber-700 to-orange-900',
                      'from-emerald-600 to-teal-900',
                      'from-slate-600 to-emerald-900',
                    ][index % 12]
                  } rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300`}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 z-10"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20">
                    <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                    <p className="text-white font-bold text-sm text-center opacity-0 group-hover:opacity-100 transition-all duration-300 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-white/80 text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  {/* Category tag */}
                  <div className="absolute bottom-3 left-3 z-30">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[item.category] || 'bg-slate-100 text-slate-700'}`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold">See It All In Person</h2>
          <p className="text-emerald-100 text-sm leading-relaxed max-w-lg mx-auto">
            Pictures can only show so much. Book a farm visit and experience the sights, sounds, and freshness of Aadhi Bhairava Cow Farm firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919344460611?text=I%20would%20like%20to%20book%20a%20farm%20visit%20at%20Aadhi%20Bhairava%20Cow%20Farm."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-lg text-sm uppercase tracking-wider shadow-lg transition"
            >
              📱 Book a Farm Visit
            </a>
            <Link href="/about" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg text-sm uppercase tracking-wider transition">
              Our Story
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
