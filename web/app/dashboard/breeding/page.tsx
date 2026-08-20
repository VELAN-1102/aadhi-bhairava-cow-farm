'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, ChevronRight, Check } from 'lucide-react';

export default function BreedingPage() {
  const [pregnancyList, setPregnancyList] = useState<any[]>([]);
  const [calvingList, setCalvingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'pregnancy' | 'calving'>('pregnancy');

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    if (activeTab === 'pregnancy') {
      setPregnancyList([
        { id: '1', cow: { tagNumber: 'GR-420' }, breedingDate: '2026-02-15', expectedCalvingDate: '2026-11-20', status: 'CONFIRMED', bullTag: 'BULL-GIR-09' },
        { id: '2', cow: { tagNumber: 'JS-310' }, breedingDate: '2026-05-10', expectedCalvingDate: '2027-02-15', status: 'SUSPECTED', bullTag: 'AI-JERSEY-88' }
      ]);
    } else {
      setCalvingList([
        { id: '1', date: '2026-08-01', cow: { tagNumber: 'SW-110' }, calfGender: 'MALE', calfTagNumber: 'CALF-SW-01', notes: 'Healthy calf birth, standard weight.' },
        { id: '2', date: '2026-07-20', cow: { tagNumber: 'JS-310' }, calfGender: 'FEMALE', calfTagNumber: 'CALF-JS-04', notes: 'Easy labor, nursing naturally.' }
      ]);
    }
    setLoading(false);
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-poppins text-textMain">Breeding & Pregnancy Logs</h1>
        <p className="text-sm text-gray-500 font-inter">Monitor gestation cycles expected calving calendars and lineage records</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-150 pb-px">
        <button
          onClick={() => setActiveTab('pregnancy')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'pregnancy' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Pregnancy Tracking
        </button>
        <button
          onClick={() => setActiveTab('calving')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'calving' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Calving History
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {activeTab === 'pregnancy' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Cow Tag</th>
                  <th className="px-6 py-4">Breeding Date</th>
                  <th className="px-6 py-4">Expected Calving</th>
                  <th className="px-6 py-4">Inseminator Bull</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pregnancyList.map(p => (
                  <tr key={p.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-primary">{p.cow?.tagNumber}</td>
                    <td className="px-6 py-4 font-semibold text-textMain">{p.breedingDate}</td>
                    <td className="px-6 py-4 font-bold text-gray-500">{p.expectedCalvingDate}</td>
                    <td className="px-6 py-4 font-medium">{p.bullTag}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase ${
                        p.status === 'CONFIRMED' ? 'bg-green-50 text-success' : 'bg-yellow-50 text-warning animate-pulse'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Calving Date</th>
                  <th className="px-6 py-4">Mother Tag</th>
                  <th className="px-6 py-4">Calf Gender</th>
                  <th className="px-6 py-4">Calf Tag</th>
                  <th className="px-6 py-4">Birth Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {calvingList.map(c => (
                  <tr key={c.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{c.date}</td>
                    <td className="px-6 py-4 font-bold text-primary">{c.cow?.tagNumber}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase ${
                        c.calfGender === 'MALE' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                      }`}>
                        {c.calfGender}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-roboto font-bold text-sidebar">{c.calfTagNumber}</td>
                    <td className="px-6 py-4 text-gray-500 leading-relaxed">{c.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
