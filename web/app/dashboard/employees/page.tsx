'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, UserCheck, CreditCard } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'employees' | 'attendance' | 'payroll'>('employees');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate reading data
    if (activeTab === 'employees') {
      setEmployees([
        { id: '1', name: 'Kumar Swami', department: 'Livestock Operations', role: 'FARM_MANAGER', email: 'kumar@cowfarm.com', joinDate: '2025-01-10', status: 'ACTIVE' },
        { id: '2', name: 'Muthu Krishnan', department: 'Milking & Dispatch', role: 'MILK_COLLECTION_OFFICER', email: 'muthu@cowfarm.com', joinDate: '2025-06-15', status: 'ACTIVE' }
      ]);
    } else if (activeTab === 'attendance') {
      setAttendance([
        { id: '1', employee: { name: 'Kumar Swami' }, date: '2026-08-05', checkIn: '08:00 AM', checkOut: '05:00 PM', status: 'PRESENT' },
        { id: '2', employee: { name: 'Muthu Krishnan' }, date: '2026-08-05', checkIn: '07:30 AM', checkOut: '04:30 PM', status: 'PRESENT' }
      ]);
    } else {
      setPayroll([
        { id: '1', employee: { name: 'Kumar Swami' }, payPeriodStart: '2026-07-01', payPeriodEnd: '2026-07-31', netSalary: 35000, status: 'PAID' },
        { id: '2', employee: { name: 'Muthu Krishnan' }, payPeriodStart: '2026-07-01', payPeriodEnd: '2026-07-31', netSalary: 25000, status: 'PAID' }
      ]);
    }
    setLoading(false);
  }, [activeTab]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-poppins text-textMain">Employee & Payroll Registry</h1>
        <p className="text-sm text-gray-500 font-inter">Manage personnel directories logs, attendance logs, and payroll invoices</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-150 pb-px">
        <button
          onClick={() => setActiveTab('employees')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'employees' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Staff Directory
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'attendance' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Attendance Logs
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition ${
            activeTab === 'payroll' ? 'border-b-2 border-primary text-primary font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Payroll Ledgers
        </button>
      </div>

      {/* Tables */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        {activeTab === 'employees' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Employee Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employees.map(e => (
                  <tr key={e.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{e.name}</td>
                    <td className="px-6 py-4 font-semibold text-gray-500">{e.department}</td>
                    <td className="px-6 py-4 font-bold text-primary">{e.role}</td>
                    <td className="px-6 py-4 font-medium">{e.email}</td>
                    <td className="px-6 py-4 text-gray-400">{e.joinDate}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 text-success">
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab === 'attendance' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-background text-gray-500 uppercase font-bold border-b border-gray-100">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Check In</th>
                  <th className="px-6 py-4">Check Out</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {attendance.map(a => (
                  <tr key={a.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{a.date}</td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{a.employee?.name}</td>
                    <td className="px-6 py-4 font-medium">{a.checkIn}</td>
                    <td className="px-6 py-4 font-medium">{a.checkOut}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 text-success">
                        {a.status}
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
                  <th className="px-6 py-4">Pay Period</th>
                  <th className="px-6 py-4">Employee</th>
                  <th className="px-6 py-4">Net Salary</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payroll.map(p => (
                  <tr key={p.id} className="hover:bg-background/30 transition">
                    <td className="px-6 py-4 font-bold text-textMain">{p.payPeriodStart} to {p.payPeriodEnd}</td>
                    <td className="px-6 py-4 font-semibold">{p.employee?.name}</td>
                    <td className="px-6 py-4 font-roboto font-bold">Rs. {p.netSalary.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold uppercase bg-green-50 text-success">
                        {p.status}
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
