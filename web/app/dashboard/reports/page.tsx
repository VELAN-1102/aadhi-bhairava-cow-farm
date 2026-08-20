'use client';

import React, { useState } from 'react';
import { Calendar, FileSpreadsheet, FileText, Download } from 'lucide-react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('milk');
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [generating, setGenerating] = useState(false);

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      // Simulate file download
      alert(`Report generated and downloaded as ${format.toUpperCase()}!`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-poppins text-textMain">Report Export Center</h1>
        <p className="text-sm text-gray-500 font-inter">Compile and download analytical reports in PDF, Excel or CSV sheets formats</p>
      </div>

      <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-textMain uppercase tracking-wider">Report Parameters</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
          <div>
            <label className="block text-gray-500 mb-1.5">Select Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="milk">Milk Production & Fat/SNF Quality</option>
              <option value="finance">Revenue vs Expenses Profit Ledger</option>
              <option value="livestock">Livestock Breeding Heifer Herd History</option>
              <option value="medical">Veterinary Vaccine treatments Timeline</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 mb-1.5">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1.5">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-background border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="border-t border-gray-100 pt-6 space-y-4">
          <p className="text-2xs font-extrabold uppercase text-gray-400 tracking-wider">Download Formats</p>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleExport('pdf')}
              disabled={generating}
              className="flex items-center justify-center space-x-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow transition disabled:opacity-50 text-xs uppercase tracking-wider"
            >
              <FileText className="w-4 h-4" />
              <span>{generating ? 'Exporting...' : 'PDF Document'}</span>
            </button>

            <button
              onClick={() => handleExport('excel')}
              disabled={generating}
              className="flex items-center justify-center space-x-2 py-3 bg-green-700 hover:bg-green-850 text-white font-bold rounded-xl shadow transition disabled:opacity-50 text-xs uppercase tracking-wider"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>{generating ? 'Exporting...' : 'Excel Sheet'}</span>
            </button>

            <button
              onClick={() => handleExport('csv')}
              disabled={generating}
              className="flex items-center justify-center space-x-2 py-3 bg-sidebar hover:bg-sidebar/95 text-white font-bold rounded-xl shadow transition disabled:opacity-50 text-xs uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>{generating ? 'Exporting...' : 'CSV Stream'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
