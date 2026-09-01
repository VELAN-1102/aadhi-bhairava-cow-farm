'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Shield, Eye, EyeOff } from 'lucide-react';
import { apiFetch } from '../../utils/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Simulate backend authentication request
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save tokens
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Connecting to server failed. Running offline fallback.');
      
      // Offline/Demo fallback to allow immediate login testing
      if (email === 'admin@cowfarm.com' && password === 'admin123') {
        localStorage.setItem('accessToken', 'mock-access-token');
        localStorage.setItem('refreshToken', 'mock-refresh-token');
        localStorage.setItem('user', JSON.stringify({
          id: 'admin-id',
          email: 'admin@cowfarm.com',
          firstName: 'Velan',
          lastName: 'MCA',
          role: 'ADMINISTRATOR',
          permissions: ['manage:cows', 'read:cows', 'manage:milk', 'read:milk', 'manage:finance', 'read:finance', 'manage:employees', 'read:employees', 'manage:settings', 'read:settings']
        }));
        router.push('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background font-inter text-textMain">
      {/* Left side: Premium branding landscape */}
      <div className="relative hidden md:flex flex-col justify-between bg-sidebar p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,125,50,0.25),transparent)] z-0"></div>
        
        <div className="flex items-center space-x-3 z-10">
          <Shield className="w-8 h-8 text-highlight" />
          <span className="text-xl font-bold font-poppins tracking-wider">AADHI BHAIRAVA</span>
        </div>

        <div className="space-y-6 z-10 max-w-md">
          <h2 className="text-4xl font-extrabold font-poppins leading-tight">
            Smart Dairy.<br />
            <span className="text-highlight">Smarter Farming.</span>
          </h2>
          <p className="text-base opacity-80 leading-relaxed">
            Enterprise Dairy Farm Management System. Designed to automate and monitor cattle profiles, milk yield fat/SNF logs, veterinary charts, and financial reports.
          </p>
        </div>

        <div className="z-10 text-xs opacity-75 font-inter">
          <p className="font-semibold">Enterprise Edition v1.0</p>
          <p className="mt-1">© 2026 Velan. All Rights Reserved.</p>
        </div>
      </div>

      {/* Right side: Glassmorphism Sign In Form */}
      <div className="flex flex-col justify-center items-center p-6 md:p-12 relative">
        <div className="w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-poppins text-textMain">Sign In</h1>
            <p className="text-sm text-gray-500 font-inter">
              Access the Smart Dairy admin terminal
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-xl">
              <p className="text-red-600 text-xs text-center font-inter">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Email Address
              </label>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition duration-150"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary transition duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-semibold pt-1">
              <label className="flex items-center space-x-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded text-primary border-gray-300 focus:ring-primary" />
                <span>Remember Me</span>
              </label>
              <a href="/forgot-password" className="text-primary hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition duration-150 text-sm flex justify-center items-center"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="text-center border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400">
              © 2026 Velan. All Rights Reserved.<br />
              <span className="font-semibold text-gray-500">Designed & Developed by Velan | MCA • Software Engineer</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
