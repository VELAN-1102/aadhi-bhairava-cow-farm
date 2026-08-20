'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Shield, User, Bell, Database } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'system' | 'audit'>('profile');
  const [profile, setProfile] = useState({
    firstName: 'Velan',
    lastName: 'MCA',
    email: 'admin@cowfarm.com',
    role: 'ADMINISTRATOR'
  });
  
  const [farmSettings, setFarmSettings] = useState({
    farmName: 'Aadhi Bhairava Cow Farm',
    weatherZip: '638001', // Tamil Nadu
    milkRateTarget: '45.0',
    lowStockThreshold: '150.0'
  });

  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    // Simulate audit logs fetch
    setAuditLogs([
      { id: '1', date: '2026-08-05 10:15 AM', action: 'UPDATE_SETTINGS', details: 'Updated milk rate targets to Rs.45/L', ipAddress: '192.168.1.5' },
      { id: '2', date: '2026-08-05 09:30 AM', action: 'LOG_MILK_COLLECTION', details: 'Logged morning shift collection yields.', ipAddress: '192.168.1.12' },
      { id: '3', date: '2026-08-04 04:00 PM', action: 'DELETE_COW', details: 'Archived deleted Jersey tag #JS-205.', ipAddress: '192.168.1.5' }
    ]);
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('User profile settings saved successfully!');
  };

  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Farm system parameters updated successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-poppins text-textMain">System Configurations</h1>
        <p className="text-sm text-gray-500 font-inter">Manage account details, farm settings, and view active system audit trails</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-150 pb-px">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'profile' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          My Profile
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'system' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Farm Settings
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'audit' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* Content Panels */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 md:p-8">
        {activeTab === 'profile' ? (
          <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-lg text-xs font-semibold">
            <div className="flex items-center space-x-4 pb-4 border-b border-gray-50">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-lg">👤</div>
              <div>
                <h3 className="text-sm font-bold text-textMain">{profile.firstName} {profile.lastName}</h3>
                <p className="text-[10px] text-primary uppercase font-extrabold tracking-wider">{profile.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 mb-1.5">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1.5">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 mb-1.5">Email Address</label>
              <input
                type="email"
                readOnly
                value={profile.email}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 focus:outline-none"
              />
            </div>

            <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition">
              Save Profile Changes
            </button>
          </form>
        ) : activeTab === 'system' ? (
          <form onSubmit={handleSettingsUpdate} className="space-y-6 max-w-lg text-xs font-semibold">
            <div>
              <label className="block text-gray-500 mb-1.5">Farm Branding Name</label>
              <input
                type="text"
                value={farmSettings.farmName}
                onChange={(e) => setFarmSettings({ ...farmSettings, farmName: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 mb-1.5">Target Weather Location PIN</label>
                <input
                  type="text"
                  value={farmSettings.weatherZip}
                  onChange={(e) => setFarmSettings({ ...farmSettings, weatherZip: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1.5">Wholesale Milk Price Target (Rs./L)</label>
                <input
                  type="number"
                  value={farmSettings.milkRateTarget}
                  onChange={(e) => setFarmSettings({ ...farmSettings, milkRateTarget: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 mb-1.5">Feed Low Stock Trigger Threshold (kg)</label>
              <input
                type="number"
                value={farmSettings.lowStockThreshold}
                onChange={(e) => setFarmSettings({ ...farmSettings, lowStockThreshold: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>

            <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition">
              Save Farm Settings
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4">Log Details</th>
                    <th className="px-6 py-4">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-background/30 transition">
                      <td className="px-6 py-4 font-bold text-gray-500">{log.date}</td>
                      <td className="px-6 py-4 font-bold text-primary">{log.action}</td>
                      <td className="px-6 py-4 font-semibold text-textMain">{log.details}</td>
                      <td className="px-6 py-4 font-roboto text-gray-400">{log.ipAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
