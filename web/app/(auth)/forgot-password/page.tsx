'use client';

import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-inter text-textMain p-6">
      <div className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-poppins">Reset Password</h1>
          <p className="text-sm text-gray-500">Enter your email to receive a recovery link</p>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center space-y-3">
            <p className="text-green-800 text-sm font-medium">Reset instructions sent!</p>
            <p className="text-xs text-gray-500">Please check your inbox at {email}.</p>
            <a href="/login" className="inline-flex items-center space-x-2 text-xs text-primary font-bold hover:underline pt-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to login</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="admin@cowfarm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition duration-150 text-sm"
            >
              Send Recovery Link
            </button>

            <div className="text-center pt-2">
              <a href="/login" className="inline-flex items-center space-x-1.5 text-xs text-gray-500 hover:text-textMain font-semibold">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Login</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
