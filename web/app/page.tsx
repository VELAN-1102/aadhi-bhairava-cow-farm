import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-inter">
      {/* Navigation Bar */}
      <header className="bg-navbar text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold font-poppins tracking-wide">🐄 Aadhi Bhairava</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-semibold">
            <a href="#about" className="hover:text-highlight transition duration-150">About</a>
            <a href="#statistics" className="hover:text-highlight transition duration-150">Stats</a>
            <a href="#features" className="hover:text-highlight transition duration-150">Features</a>
            <a href="#gallery" className="hover:text-highlight transition duration-150">Gallery</a>
            <a href="#faq" className="hover:text-highlight transition duration-150">FAQ</a>
            <a href="#contact" className="hover:text-highlight transition duration-150">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/login" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-4 py-2 rounded-xl text-sm transition duration-150">
              Sign In
            </a>
            <a href="/register" className="bg-primary hover:bg-primary/95 text-white font-semibold px-4 py-2 rounded-xl text-sm shadow transition duration-150">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-sidebar text-white py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex bg-primary/20 border border-primary/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-highlight uppercase">
              Intelligent Agriculture
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold font-poppins leading-tight">
              Smart Dairy.<br />
              <span className="text-highlight">Smarter Farming.</span>
            </h1>
            <p className="text-lg opacity-90 leading-relaxed max-w-xl">
              Empowering modern dairy farms with intelligent livestock monitoring, milk production optimization, automated veterinary workflows, finance ledgers, and advanced agronomy AI.
            </p>
            <div className="flex flex-row space-x-4 pt-4">
              <a href="/login" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition duration-150 text-center">
                Explore Dashboard
              </a>
              <a href="#features" className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold px-6 py-3 rounded-2xl transition duration-150 text-center">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative justify-center items-center hidden md:flex">
            <div className="w-96 h-96 bg-primary-light/10 border border-white/10 rounded-full absolute -top-8 -right-8 animate-pulse"></div>
            {/* Visual Representation of green dairy farm sunrise */}
            <div className="bg-gradient-to-tr from-primary to-secondary p-8 rounded-3xl shadow-2xl w-full max-w-md aspect-video flex flex-col justify-between text-white relative">
              <div className="flex justify-between items-start">
                <span className="text-sm font-bold tracking-widest opacity-80 uppercase">IoT Sensor Active</span>
                <span className="bg-success text-white px-2 py-0.5 rounded-full text-2xs uppercase font-extrabold tracking-wide">Live</span>
              </div>
              <div className="space-y-2">
                <div className="text-2xs uppercase opacity-75 font-semibold">Total Yield (Today)</div>
                <div className="text-4xl font-bold font-roboto tracking-tight">2,850 Liters</div>
                <div className="text-xs text-green-300 font-medium">↑ +14.2% from average yield</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,125,50,0.15),transparent)]"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold tracking-widest text-primary uppercase">About Aadhi Bhairava</h2>
            <p className="text-3xl font-bold font-poppins text-textMain">Empowering Dairy Operations Globally</p>
            <p className="text-base text-gray-500">
              Aadhi Bhairava Cow Farm combines classic agricultural experience with state-of-the-art software pipelines, bringing IoT data telemetry, health analytics, and machine learning to cow farming.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-background border border-gray-100 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold mb-4">🐄</div>
              <h3 className="text-xl font-bold text-textMain mb-2 font-poppins">Cattle Tracking</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Log profiles, lineage details, weights histories, breeding cycles, expected calving records, and photo libraries seamlessly.
              </p>
            </div>
            <div className="p-6 bg-background border border-gray-100 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold mb-4">🥛</div>
              <h3 className="text-xl font-bold text-textMain mb-2 font-poppins">Milk Analytics</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Log morning and evening collections, track solid-not-fat (SNF) percentages, temperature readings, and invoice commercial customer dispatches.
              </p>
            </div>
            <div className="p-6 bg-background border border-gray-100 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-xl font-bold mb-4">🩺</div>
              <h3 className="text-xl font-bold text-textMain mb-2 font-poppins">Veterinary Records</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Manage treatments, schedule vaccinations, track disease outbreaks, and review clinical diaries written by attending veterinarians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar text-white py-12 mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg font-poppins">🐄 Aadhi Bhairava Cow Farm</span>
          </div>
          <div className="text-gray-400">
            © {new Date().getFullYear()} Aadhi Bhairava. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
