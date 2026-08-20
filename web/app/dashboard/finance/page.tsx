'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancePage() {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'income' | 'expense' | 'invoice'>('income');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading data
    if (activeTab === 'income') {
      setIncomes([
        { id: '1', date: '2026-08-05', source: 'Milk Sale Invoice #210', amount: 67500, status: 'RECEIVED' },
        { id: '2', date: '2026-08-04', source: 'Cattle Auction Gir Bull', amount: 85000, status: 'RECEIVED' }
      ]);
    } else if (activeTab === 'expense') {
      setExpenses([
        { id: '1', date: '2026-08-01', category: 'Cattle Feed Restock', amount: 45000, status: 'PAID' },
        { id: '2', date: '2026-08-03', category: 'Veterinary Vaccine Ampoules', amount: 15000, status: 'PAID' }
      ]);
    } else {
      setInvoices([
        { id: '1', date: '2026-08-05', customer: { name: 'Dairy Cooperative Ltd.' }, type: 'INCOME', amount: 67500, status: 'UNPAID' },
        { id: '2', date: '2026-08-01', customer: { name: 'Vedic Feeds Corp.' }, type: 'EXPENSE', amount: 45000, status: 'PAID' }
      ]);
    }
    setLoading(false);
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-poppins text-textMain">Finance & Ledgers</h1>
        <p className="text-sm text-gray-500 font-inter">Track revenues income streams, operational expenses, and pending invoice sheets</p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-50 rounded-2xl text-success">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Gross Income</p>
            <p className="text-xl font-bold text-textMain font-roboto">Rs. 1,52,500</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-50 rounded-2xl text-danger">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Total Expenses</p>
            <p className="text-xl font-bold text-textMain font-roboto">Rs. 60,000</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Net Profit</p>
            <p className="text-xl font-bold text-textMain font-roboto">Rs. 92,500</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-150 pb-px">
        <button
          onClick={() => setActiveTab('income')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'income' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Revenues Register
        </button>
        <button
          onClick={() => setActiveTab('expense')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'expense' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Expenses Book
        </button>
        <button
          onClick={() => setActiveTab('invoice')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'invoice' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Invoices Ledger
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {activeTab === 'income' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Revenue Source</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {incomes.map(inc => (
                  <tr key={inc.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{inc.date}</td>
                    <td className="px-6 py-4 font-semibold">{inc.source}</td>
                    <td className="px-6 py-4 font-roboto font-bold text-success">Rs. {inc.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 text-success">
                        {inc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'expense' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Expense Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{exp.date}</td>
                    <td className="px-6 py-4 font-semibold text-gray-500">{exp.category}</td>
                    <td className="px-6 py-4 font-roboto font-bold text-danger">Rs. {exp.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 text-success">
                        {exp.status}
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
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Party</th>
                  <th className="px-6 py-4">Invoice Type</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{inv.date}</td>
                    <td className="px-6 py-4 font-semibold">{inv.customer?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-3xs font-extrabold uppercase ${
                        inv.type === 'INCOME' ? 'bg-green-50 text-success' : 'bg-red-50 text-danger'
                      }`}>
                        {inv.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-roboto font-bold">Rs. {inv.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase ${
                        inv.status === 'PAID' ? 'bg-green-50 text-success' : 'bg-yellow-50 text-warning animate-pulse'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
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
