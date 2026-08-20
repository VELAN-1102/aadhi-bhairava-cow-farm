'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, ShieldAlert, Award, Calendar, CheckSquare,
  ArrowRight, Thermometer, Droplets, CloudRain
} from 'lucide-react';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalCows: 120,
    healthyCows: 112,
    sickCows: 3,
    pregnantCows: 5,
    milkToday: 2850,
    monthlyMilk: 84200,
    revenue: 452000,
    expenses: 184500,
    profit: 267500,
    vaccinationsDue: 4,
    pendingTasks: 3
  });

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Load simulation statistics data
    setActivities([
      { id: 1, action: 'LOG_MILK_COLLECTION', details: 'Logged 1,420L for Morning shift collection.', user: 'Collection Officer', time: '2 hours ago' },
      { id: 2, action: 'CREATE_COW', details: 'Registered new Gir breed heifer tag #GR-502.', user: 'Farm Manager', time: '4 hours ago' },
      { id: 3, action: 'ADMINISTER_VACCINE', details: 'Administered Anthrax booster to Jersey Cow #JS-412.', user: 'Veterinarian', time: '1 day ago' },
      { id: 4, action: 'LOG_EXPENSE', details: 'Logged Rs.45,000 feed purchase invoice.', user: 'Finance Manager', time: '2 days ago' }
    ]);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-textMain">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 font-inter">Real-time smart telemetry and metrics summary</p>
        </div>
        <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl flex items-center space-x-2 text-xs font-semibold text-gray-500 shadow-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Cows</span>
            <span className="text-xl">🐄</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold font-roboto text-textMain">{stats.totalCows}</p>
            <p className="text-3xs text-green-600 font-bold mt-1">↑ +2.5% from last month</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Milk Today</span>
            <span className="text-xl">🥛</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold font-roboto text-textMain">{stats.milkToday} L</p>
            <p className="text-3xs text-green-600 font-bold mt-1">↑ +4.2% from average yield</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monthly Profit</span>
            <span className="text-xl">💰</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold font-roboto text-textMain">Rs. {stats.profit.toLocaleString()}</p>
            <p className="text-3xs text-green-600 font-bold mt-1">↑ +12.4% margins gain</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between aspect-square md:aspect-auto md:h-32">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Alerts Queue</span>
            <span className="text-xl">🩺</span>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold font-roboto text-textMain">{stats.vaccinationsDue + stats.pendingTasks}</p>
            <p className="text-3xs text-warning font-bold mt-1">Requires immediate review</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts & Trends */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Milk Production Line Graph (Native responsive SVG chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-textMain uppercase tracking-wider">Weekly Production Yield</h2>
              <p className="text-xs text-gray-400 mt-0.5">Average collection yields per day</p>
            </div>
            <span className="text-2xs font-bold text-primary uppercase bg-green-50 px-2 py-1 rounded-lg">Liters (L)</span>
          </div>
          
          <div className="w-full h-64 pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#2E7D32" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="40" y1="30" x2="480" y2="30" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="90" x2="480" y2="90" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="150" x2="480" y2="150" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="3" />
              
              {/* Chart Line Path */}
              <path
                d="M 40 140 Q 110 80 180 120 T 320 60 T 480 90 L 480 170 L 40 170 Z"
                fill="url(#areaGrad)"
              />
              <path
                d="M 40 140 Q 110 80 180 120 T 320 60 T 480 90"
                fill="none"
                stroke="#2E7D32"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points markers */}
              <circle cx="180" cy="120" r="5" fill="#2E7D32" stroke="#ffffff" strokeWidth="2" />
              <circle cx="320" cy="60" r="5" fill="#F9A825" stroke="#ffffff" strokeWidth="2" />
              
              {/* Axis Labels */}
              <text x="40" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Mon</text>
              <text x="110" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Tue</text>
              <text x="180" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Wed</text>
              <text x="250" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Thu</text>
              <text x="320" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Fri</text>
              <text x="400" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Sat</text>
              <text x="470" y="185" fill="#9ca3af" fontSize="9" fontWeight="bold">Sun</text>

              <text x="15" y="34" fill="#9ca3af" fontSize="9" fontWeight="bold">3k</text>
              <text x="15" y="94" fill="#9ca3af" fontSize="9" fontWeight="bold">2k</text>
              <text x="15" y="154" fill="#9ca3af" fontSize="9" fontWeight="bold">1k</text>
            </svg>
          </div>
        </div>

        {/* Health status distribution Pie representation */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h2 className="text-sm font-bold text-textMain uppercase tracking-wider">Cattle Health Status</h2>
            <p className="text-xs text-gray-400 mt-0.5">Herd condition distribution profile</p>
          </div>

          <div className="flex items-center justify-center h-48 relative">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
              {/* Healthy sector (green) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#43A047" strokeWidth="12"
                      strokeDasharray="210 251" strokeDashoffset="0" strokeLinecap="round"/>
              {/* Sick sector (red) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E53935" strokeWidth="12"
                      strokeDasharray="15 251" strokeDashoffset="-210" strokeLinecap="round"/>
              {/* Pregnant sector (yellow) */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#FB8C00" strokeWidth="12"
                      strokeDasharray="26 251" strokeDashoffset="-225" strokeLinecap="round"/>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-roboto text-textMain">93%</span>
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest mt-0.5">Optimal</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50 text-center">
            <div>
              <p className="text-xs font-bold text-success font-roboto">112</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Healthy</p>
            </div>
            <div>
              <p className="text-xs font-bold text-danger font-roboto">3</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Sick</p>
            </div>
            <div>
              <p className="text-xs font-bold text-warning font-roboto">5</p>
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Pregnant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Activities and Weather */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activities Log */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-textMain uppercase tracking-wider">Recent Farm Logs</h2>
              <p className="text-xs text-gray-400 mt-0.5">Chronological system operations audits</p>
            </div>
            <a href="/dashboard/settings" className="text-xs text-primary font-bold hover:underline flex items-center space-x-1">
              <span>View Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start justify-between text-xs pb-3 border-b border-gray-50 last:border-b-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-extrabold tracking-widest">{act.action}</span>
                    <span className="text-gray-400 font-medium">• {act.user}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{act.details}</p>
                </div>
                <span className="text-gray-400 text-3xs font-semibold whitespace-nowrap ml-4">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Weather Forecast for Agriculture */}
        <div className="bg-gradient-to-tr from-primary to-secondary p-6 rounded-3xl shadow-md text-white flex flex-col justify-between aspect-video md:aspect-auto">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-2xs font-extrabold uppercase tracking-widest text-green-300">Live Agriculture Weather</span>
              <h3 className="text-xl font-bold font-poppins">Golden Pasture Ticker</h3>
            </div>
            <CloudRain className="w-8 h-8 text-highlight" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-green-300" />
              <div className="text-xs">
                <p className="text-[10px] opacity-75 uppercase">Temp</p>
                <p className="font-bold font-roboto">32.5 °C</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-green-300" />
              <div className="text-xs">
                <p className="text-[10px] opacity-75 uppercase">Humidity</p>
                <p className="font-bold font-roboto">68.0 %</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CloudRain className="w-4 h-4 text-green-300" />
              <div className="text-xs">
                <p className="text-[10px] opacity-75 uppercase">Rainfall</p>
                <p className="font-bold font-roboto">0.0 mm</p>
              </div>
            </div>
          </div>

          <p className="text-xs opacity-90 leading-relaxed border-t border-white/10 pt-4 mt-4">
            🌤️ **Forecast**: Ideal grazing temperatures expected. Rain possibility is low. Keep cattle feed inventory logs updated to buffer for the upcoming heat days.
          </p>
        </div>
      </div>
    </div>
  );
}
