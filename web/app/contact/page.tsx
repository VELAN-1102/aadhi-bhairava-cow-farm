import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Aadhi Bhairava Cow Farm',
  description: 'Reach out to Aadhi Bhairava Cow Farm for milk orders, farm visits, cows for sale, business partnerships, or general enquiries.',
};

const contactMethods = [
  {
    icon: '📱',
    title: 'WhatsApp',
    value: '+91 93444 60611',
    sub: 'Quickest response — order milk, ask questions',
    href: 'https://wa.me/919344460611?text=Hello%20Aadhi%20Bhairava%20Cow%20Farm!',
    cta: 'Chat on WhatsApp',
    color: 'bg-green-50 border-green-200',
    btnColor: 'bg-green-500 hover:bg-green-600',
  },
  {
    icon: '📞',
    title: 'Phone Call',
    value: '+91 93444 60611',
    sub: 'Mon–Sat, 6 AM – 8 PM',
    href: 'tel:+919344460611',
    cta: 'Call Now',
    color: 'bg-blue-50 border-blue-200',
    btnColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    icon: '📧',
    title: 'Email',
    value: 'info@aadhicowtarm.com',
    sub: 'For formal enquiries and partnerships',
    href: 'mailto:info@aadhicowtarm.com',
    cta: 'Send Email',
    color: 'bg-purple-50 border-purple-200',
    btnColor: 'bg-purple-600 hover:bg-purple-700',
  },
];

const enquiryTopics = [
  'Fresh Milk Order',
  'Daily Milk Subscription',
  'Cow for Sale',
  'Farm Visit',
  'Bulk Dairy Supply',
  'Business Partnership',
  'Career / Employment',
  'Other',
];

export default function ContactPage() {
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
            <Link href="/contact" className="text-amber-300">Contact</Link>
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
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            We&apos;d Love to<br />
            <span className="text-amber-300">Hear From You</span>
          </h1>
          <p className="text-slate-200 text-sm leading-relaxed max-w-xl mx-auto">
            Whether you want to order fresh milk, buy a cow, visit our farm, or explore a business partnership — we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Reach Us</span>
            <h2 className="text-2xl font-extrabold text-slate-800">Contact Channels</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {contactMethods.map((c) => (
              <div key={c.title} className={`rounded-2xl border p-6 space-y-4 ${c.color}`}>
                <div className="text-4xl">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-800">{c.title}</h3>
                  <p className="text-sm font-semibold text-slate-700 mt-1">{c.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.sub}</p>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center text-white font-bold text-xs py-2.5 rounded-xl uppercase tracking-widest transition ${c.btnColor}`}
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-2xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Send a Message</span>
            <h2 className="text-2xl font-extrabold text-slate-800">Enquiry Form</h2>
          </div>
          <form
            action={`https://wa.me/919344460611`}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Ravi Kumar"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Enquiry Topic *</label>
              <select
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 cursor-pointer transition"
              >
                <option value="">Select a topic...</option>
                {enquiryTopics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 resize-none transition"
              />
            </div>
            <a
              href="https://wa.me/919344460611?text=Hello%20Aadhi%20Bhairava%20Cow%20Farm!%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm uppercase tracking-widest text-center shadow transition"
            >
              📱 Send via WhatsApp
            </a>
            <p className="text-xs text-slate-400 text-center">
              We typically respond within 30 minutes during farm hours (6 AM – 8 PM).
            </p>
          </form>
        </div>
      </section>

      {/* Farm Location */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Find Us</span>
            <h2 className="text-2xl font-extrabold text-slate-800">Farm Location</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Address</h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <p>📍 Aadhi Bhairava Cow Farm</p>
                  <p>Village Road, Bhavani Taluk</p>
                  <p>Erode District, Tamil Nadu — 638 301</p>
                  <p>India</p>
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Farm Hours</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Morning Milking</span><span className="font-semibold text-emerald-700">5:00 AM – 8:00 AM</span></div>
                  <div className="flex justify-between"><span>Office Hours</span><span className="font-semibold text-emerald-700">9:00 AM – 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Evening Milking</span><span className="font-semibold text-emerald-700">5:00 PM – 7:30 PM</span></div>
                  <div className="flex justify-between"><span>Days</span><span className="font-semibold text-emerald-700">Mon – Sat</span></div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl p-8 text-white text-center space-y-4 h-full flex flex-col items-center justify-center">
              <div className="text-6xl">📍</div>
              <h3 className="font-bold text-xl">Visit Us</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                We welcome farm visits by appointment. Come see our cows, our milking process, and how we maintain the highest quality standards.
              </p>
              <a
                href="https://wa.me/919344460611?text=I%20would%20like%20to%20schedule%20a%20farm%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition"
              >
                Book a Visit
              </a>
            </div>
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
