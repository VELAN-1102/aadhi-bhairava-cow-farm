'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, Package } from 'lucide-react';

export default function InventoryPage() {
  const [feedStock, setFeedStock] = useState<any[]>([]);
  const [medicineStock, setMedicineStock] = useState<any[]>([]);
  const [equipment, setEquipment] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'feed' | 'medicine' | 'equipment'>('feed');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading data
    if (activeTab === 'feed') {
      setFeedStock([
        { id: '1', name: 'Organic Alfalfa Silage', quantity: 1200, unit: 'kg', minThreshold: 200, supplier: { name: 'Vedic Feeds Corp.' } },
        { id: '2', name: 'Nutritional Mineral Mix', quantity: 150, unit: 'kg', minThreshold: 50, supplier: { name: 'Kisan Agro Products' } }
      ]);
    } else if (activeTab === 'medicine') {
      setMedicineStock([
        { id: '1', name: 'Mastiguard Antibiotic', quantity: 24, unit: 'vials', expiryDate: '2027-04-10', supplier: { name: 'BioVet Pharma' } },
        { id: '2', name: 'Deworming Suspension B', quantity: 5, unit: 'liters', expiryDate: '2027-01-15', supplier: { name: 'BioVet Pharma' } }
      ]);
    } else {
      setEquipment([
        { id: '1', name: 'DeLaval Milking Machine M100', status: 'OPERATIONAL', lastServiced: '2026-06-15' },
        { id: '2', name: 'Chilled Milk Storage Tank 5KL', status: 'OPERATIONAL', lastServiced: '2026-05-10' }
      ]);
    }
    setLoading(false);
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-poppins text-textMain">Warehouse & Feed Inventory</h1>
        <p className="text-sm text-gray-500 font-inter">Manage feeds quantities, veterinary medicine stock levels, and machinery status</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-150 pb-px">
        <button
          onClick={() => setActiveTab('feed')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'feed' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Feeds Stock
        </button>
        <button
          onClick={() => setActiveTab('medicine')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'medicine' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Medicine Cabinet
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'equipment' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Equipment Assets
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {activeTab === 'feed' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Current Stock</th>
                  <th className="px-6 py-4">Min. Threshold</th>
                  <th className="px-6 py-4">Supplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {feedStock.map(f => (
                  <tr key={f.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{f.name}</td>
                    <td className="px-6 py-4 font-roboto font-bold text-primary">{f.quantity} {f.unit}</td>
                    <td className="px-6 py-4 font-roboto text-gray-500">{f.minThreshold} {f.unit}</td>
                    <td className="px-6 py-4 font-medium">{f.supplier?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'medicine' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Medicine Name</th>
                  <th className="px-6 py-4">Remaining Qty</th>
                  <th className="px-6 py-4">Expiry Date</th>
                  <th className="px-6 py-4">Supplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {medicineStock.map(m => (
                  <tr key={m.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{m.name}</td>
                    <td className="px-6 py-4 font-roboto font-bold text-primary">{m.quantity} {m.unit}</td>
                    <td className="px-6 py-4 font-bold text-gray-500">{m.expiryDate}</td>
                    <td className="px-6 py-4 font-medium">{m.supplier?.name}</td>
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
                  <th className="px-6 py-4">Equipment Name</th>
                  <th className="px-6 py-4">Servicing Status</th>
                  <th className="px-6 py-4">Last Serviced</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {equipment.map(eq => (
                  <tr key={eq.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{eq.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 text-success">
                        {eq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-bold">{eq.lastServiced}</td>
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
