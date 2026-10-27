import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found — Aadhi Bhairava Cow Farm',
  description: 'The page you are looking for could not be found. Return to the Aadhi Bhairava Cow Farm home page.',
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] flex flex-col items-center justify-center text-white px-6">
      <div className="text-center space-y-8 max-w-lg">
        {/* Big Animated Cow */}
        <div className="text-8xl animate-bounce">🐄</div>

        {/* 404 Text */}
        <div className="space-y-3">
          <h1 className="text-9xl font-extrabold text-amber-400 leading-none tracking-tighter">404</h1>
          <h2 className="text-2xl font-extrabold">Page Not Found</h2>
          <p className="text-emerald-200 text-sm leading-relaxed">
            Oops! Looks like this cow wandered off. The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-xl text-sm uppercase tracking-wider shadow-lg transition"
          >
            🏠 Back to Home
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-white/10 pt-6 space-y-3">
          <p className="text-xs text-emerald-300 uppercase font-bold tracking-widest">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/about', label: '🌿 About Us' },
              { href: '/milk', label: '🥛 Fresh Milk' },
              { href: '/cows-for-sale', label: '🐄 Cows for Sale' },
              { href: '/services', label: '📋 Services' },
              { href: '/gallery', label: '📸 Gallery' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-emerald-200 hover:text-amber-300 font-semibold transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Branding Footer */}
        <div className="pt-4 text-xs text-emerald-500">
          <p>© 2026 Aadhi Bhairava Cow Farm. All Rights Reserved.</p>
          <p className="mt-1">Designed & Developed by <span className="text-emerald-300 font-semibold">Velan | MCA • Software Engineer</span></p>
        </div>
      </div>
    </div>
  );
}
