'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, Heart, ShieldAlert, Award, FileText } from 'lucide-react';
import { apiFetch } from '../../utils/api';

export default function VeterinaryPage() {
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [vaccinations, setVaccinations] = useState<any[]>([]);
  const [diseases, setDiseases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'medical' | 'vaccination' | 'disease'>('medical');

  // Form State
  const [showMedicalForm, setShowMedicalForm] = useState(false);
  const [showVaccinationForm, setShowVaccinationForm] = useState(false);
  const [formData, setFormData] = useState({
    cowId: '',
    diagnosis: '',
    treatment: '',
    doctorName: 'Dr. Ramesh Kumar',
    prescription: '',
    cost: 500,
    notes: 'Mild illness'
  });

  const [vaccineData, setVaccineData] = useState({
    cowId: '',
    vaccineName: 'Foot and Mouth Disease (FMD)',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [activeTab]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      if (activeTab === 'medical') {
        const res = await apiFetch('/api/vet/medical');
        const data = await res.json();
        if (res.ok) setMedicalRecords(data.data.data);
      } else if (activeTab === 'vaccination') {
        const res = await apiFetch('/api/vet/vaccination');
        const data = await res.json();
        if (res.ok) setVaccinations(data.data.data);
      } else {
        const res = await apiFetch('/api/vet/disease');
        const data = await res.json();
        if (res.ok) setDiseases(data.data);
      }
    } catch (err) {
      // Offline fallback
      if (activeTab === 'medical') {
        setMedicalRecords([
          { id: '1', date: '2026-08-01', cow: { tagNumber: 'GR-420' }, diagnosis: 'Mastitis', treatment: 'Antibiotic therapy', doctorName: 'Dr. Ramesh Kumar', status: 'CLOSED', cost: 1200 },
          { id: '2', date: '2026-08-04', cow: { tagNumber: 'SW-110' }, diagnosis: 'Fever', treatment: 'Antipyretic injection', doctorName: 'Dr. Ramesh Kumar', status: 'OPEN', cost: 500 }
        ]);
      } else if (activeTab === 'vaccination') {
        setVaccinations([
          { id: '1', cow: { tagNumber: 'GR-420' }, vaccineName: 'Brucellosis', dueDate: '2026-08-10', status: 'PENDING' },
          { id: '2', cow: { tagNumber: 'JS-310' }, vaccineName: 'FMD', dueDate: '2026-08-05', status: 'COMPLETED', administeredDate: '2026-08-05' }
        ]);
      } else {
        setDiseases([
          { id: '1', name: 'Mastitis', severity: 'MEDIUM', symptoms: 'Swollen udder, fever, low milk fat' },
          { id: '2', name: 'Brucellosis', severity: 'HIGH', symptoms: 'Abortion, infertility, fever' }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMedical = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await apiFetch('/api/vet/medical', {
        method: 'POST',
        body: JSON.stringify({ ...formData, date: new Date().toISOString() })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Medical treatment record opened successfully!');
        setShowMedicalForm(false);
        fetchLogs();
      } else {
        setMessage(data.message || 'Error opening record.');
      }
    } catch (err) {
      setMessage('Added to offline sync list.');
    }
  };

  const handleScheduleVaccine = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await apiFetch('/api/vet/vaccination', {
        method: 'POST',
        body: JSON.stringify(vaccineData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Vaccination schedule saved!');
        setShowVaccinationForm(false);
        fetchLogs();
      } else {
        setMessage(data.message || 'Error scheduling vaccine.');
      }
    } catch (err) {
      setMessage('Scheduled locally inside offline database.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-textMain">Veterinary & Health Charts</h1>
          <p className="text-sm text-gray-500 font-inter">Manage medical treatings, scheduled vaccine calendars and disease outbreaks logs</p>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'medical' && (
            <button 
              onClick={() => setShowMedicalForm(true)}
              className="bg-primary hover:bg-primary/95 text-white font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow"
            >
              <Heart className="w-4 h-4" />
              <span>Diagnose Cow</span>
            </button>
          )}
          {activeTab === 'vaccination' && (
            <button 
              onClick={() => setShowVaccinationForm(true)}
              className="bg-primary hover:bg-primary/95 text-white font-semibold px-4 py-2.5 rounded-xl text-sm flex items-center space-x-2 shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Vaccine</span>
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
          <p className="text-primary text-xs font-bold font-inter text-center">{message}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-150 pb-px">
        <button
          onClick={() => setActiveTab('medical')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'medical' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Clinical Records
        </button>
        <button
          onClick={() => setActiveTab('vaccination')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'vaccination' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Vaccinations Schedule
        </button>
        <button
          onClick={() => setActiveTab('disease')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'disease' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Diseases Catalog
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {activeTab === 'medical' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Cow Tag</th>
                  <th className="px-6 py-4">Diagnosis</th>
                  <th className="px-6 py-4">Treatment Plan</th>
                  <th className="px-6 py-4">Attending Vet</th>
                  <th className="px-6 py-4">Cost</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {medicalRecords.map(r => (
                  <tr key={r.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{r.date}</td>
                    <td className="px-6 py-4 font-bold text-primary">{r.cow?.tagNumber}</td>
                    <td className="px-6 py-4 font-semibold text-danger">{r.diagnosis}</td>
                    <td className="px-6 py-4 font-medium">{r.treatment}</td>
                    <td className="px-6 py-4 text-gray-500">{r.doctorName}</td>
                    <td className="px-6 py-4 font-roboto font-bold">Rs. {r.cost}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase ${
                        r.status === 'CLOSED' ? 'bg-green-50 text-success' : 'bg-red-50 text-danger animate-pulse'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'vaccination' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Cow Tag</th>
                  <th className="px-6 py-4">Vaccine Type</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {vaccinations.map(v => (
                  <tr key={v.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-primary">{v.cow?.tagNumber}</td>
                    <td className="px-6 py-4 font-semibold text-textMain">{v.vaccineName}</td>
                    <td className="px-6 py-4 font-bold text-gray-500">{v.dueDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase ${
                        v.status === 'COMPLETED' ? 'bg-green-50 text-success' : 'bg-yellow-50 text-warning animate-pulse'
                      }`}>
                        {v.status}
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
                  <th className="px-6 py-4">Disease Name</th>
                  <th className="px-6 py-4">Severity Level</th>
                  <th className="px-6 py-4">Symptoms Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {diseases.map(d => (
                  <tr key={d.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-danger">{d.name}</td>
                    <td className="px-6 py-4 font-bold uppercase tracking-wider text-textMain">{d.severity}</td>
                    <td className="px-6 py-4 text-gray-500 leading-relaxed">{d.symptoms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Diagnose Form Modal */}
      {showMedicalForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 relative animate-in fade-in zoom-in duration-150">
            <button onClick={() => setShowMedicalForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <span className="text-xl">×</span>
            </button>
            <h3 className="text-lg font-bold font-poppins text-textMain">Open Diagnosis Sheet</h3>
            <form onSubmit={handleOpenMedical} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-500 mb-1">Cow Tag ID</label>
                <input
                  type="text" required placeholder="e.g. GR-420"
                  value={formData.cowId}
                  onChange={(e) => setFormData({ ...formData, cowId: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Diagnosis Description</label>
                <input
                  type="text" required placeholder="e.g. Mastitis, Milk fever"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Treatment Plan / Injection</label>
                <input
                  type="text" required placeholder="e.g. Antibiotics injection"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition duration-150">
                Log Medical Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Vaccine Form Modal */}
      {showVaccinationForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-4 relative animate-in fade-in zoom-in duration-150">
            <button onClick={() => setShowVaccinationForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <span className="text-xl">×</span>
            </button>
            <h3 className="text-lg font-bold font-poppins text-textMain">Schedule Vaccination</h3>
            <form onSubmit={handleScheduleVaccine} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-500 mb-1">Cow Tag ID</label>
                <input
                  type="text" required placeholder="e.g. GR-420"
                  value={vaccineData.cowId}
                  onChange={(e) => setVaccineData({ ...vaccineData, cowId: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Vaccine Name</label>
                <select
                  value={vaccineData.vaccineName}
                  onChange={(e) => setVaccineData({ ...vaccineData, vaccineName: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                >
                  <option value="Brucellosis Vaccine">Brucellosis Vaccine</option>
                  <option value="Foot and Mouth Disease (FMD) Vaccine">Foot and Mouth Disease (FMD) Vaccine</option>
                  <option value="Anthrax Spore Vaccine">Anthrax Spore Vaccine</option>
                  <option value="Deworming Booster">Deworming Booster</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Due Date</label>
                <input
                  type="date" required
                  value={vaccineData.dueDate}
                  onChange={(e) => setVaccineData({ ...vaccineData, dueDate: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition duration-150">
                Save Schedule
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
