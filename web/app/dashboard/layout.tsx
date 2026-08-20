'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Menu, X, LayoutDashboard, User, Settings, LogOut, Bell, CloudSun,
  ChevronRight, Sparkles, FolderSync, ShieldAlert, Award
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  roles?: string[];
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    
    if (!token || !storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }

    // Load initial system notifications
    setNotifications([
      { id: '1', title: 'Vaccination Alert', message: 'Jersey Cow #JS-420 is due for deworming vaccine today.', read: false },
      { id: '2', title: 'Low Stock Feed Warning', message: 'Organic Alfalfa silage level falls below 150 kg alert threshold.', read: false }
    ]);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const menuItems: SidebarItem[] = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Cows & Cattle', href: '/dashboard/cows', icon: '🐄', roles: ['ADMINISTRATOR', 'FARM_MANAGER', 'FARM_OWNER', 'VETERINARIAN', 'EMPLOYEE', 'VIEWER'] },
    { name: 'Milk Yields', href: '/dashboard/milk', icon: '🥛', roles: ['ADMINISTRATOR', 'FARM_MANAGER', 'MILK_COLLECTION_OFFICER', 'EMPLOYEE'] },
    { name: 'Veterinary Check', href: '/dashboard/veterinary', icon: '🩺', roles: ['ADMINISTRATOR', 'FARM_MANAGER', 'VETERINARIAN'] },
    { name: 'Breeding Timeline', href: '/dashboard/breeding', icon: '🧬', roles: ['ADMINISTRATOR', 'FARM_MANAGER'] },
    { name: 'Employees Directory', href: '/dashboard/employees', icon: '👥', roles: ['ADMINISTRATOR', 'FARM_MANAGER'] },
    { name: 'Warehouse Stocks', href: '/dashboard/inventory', icon: '📦', roles: ['ADMINISTRATOR', 'FARM_MANAGER', 'INVENTORY_MANAGER'] },
    { name: 'Finance Ledger', href: '/dashboard/finance', icon: '💰', roles: ['ADMINISTRATOR', 'FARM_OWNER', 'FINANCE_MANAGER'] },
    { name: 'Export Reports', href: '/dashboard/reports', icon: '📄', roles: ['ADMINISTRATOR', 'FARM_OWNER', 'FARM_MANAGER'] },
    { name: 'System Settings', href: '/dashboard/settings', icon: '⚙️', roles: ['ADMINISTRATOR'] }
  ];

  const hasAccess = (item: SidebarItem) => {
    if (!item.roles || !user) return true;
    return item.roles.includes(user.role);
  };

  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((part, index) => ({
      name: part.charAt(0).toUpperCase() + part.slice(1),
      href: '/' + parts.slice(0, index + 1).join('/')
    }));
  };

  return (
    <div className="min-h-screen flex bg-background font-inter text-textMain">
      {/* Sidebar Panel */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sidebar text-white transition-all duration-300 flex flex-col justify-between z-40 fixed h-full md:relative`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center font-bold text-white text-base">🐄</div>
              {sidebarOpen && <span className="font-poppins font-bold tracking-wider text-sm">AADHI BHAIRAVA</span>}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white hidden md:block">
              <ChevronRight className={`w-4 h-4 transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5">
            {menuItems.filter(hasAccess).map((item) => {
              const active = pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    active ? 'bg-primary text-white shadow-md' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Copyright branding */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <button 
            onClick={() => setShowAbout(true)}
            className="flex items-center text-xs text-white/50 hover:text-white font-semibold transition"
          >
            <Award className="w-4 h-4 mr-2 text-highlight" />
            {sidebarOpen ? 'About Smart Dairy' : 'About'}
          </button>
          {sidebarOpen && (
            <div className="text-[10px] text-white/40 leading-relaxed font-inter">
              <p>Enterprise Edition v1.0</p>
              <p>© 2026 Velan. All Rights Reserved.</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 z-30">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700 md:hidden">
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Breadcrumbs */}
            <div className="hidden sm:flex items-center space-x-2 text-xs font-semibold text-gray-400">
              <span className="hover:text-gray-600 cursor-pointer">Admin</span>
              {getBreadcrumbs().map((b) => (
                <React.Fragment key={b.name}>
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                  <a href={b.href} className="hover:text-gray-600">{b.name}</a>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Weather Widget */}
            <div className="hidden lg:flex items-center space-x-2 text-xs font-semibold text-gray-500 bg-background border border-gray-100 px-3 py-1.5 rounded-full">
              <CloudSun className="w-4 h-4 text-warning" />
              <span>32.5°C | Sunny, Perfect grazing</span>
            </div>

            {/* Notification Badge */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-gray-700 relative p-1.5 bg-background hover:bg-gray-100 rounded-full transition"
              >
                <Bell className="w-4 h-4" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50">
                  <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Alert Center</span>
                    <button className="text-2xs text-primary font-bold hover:underline" onClick={() => setNotifications([])}>Clear All</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-400 text-center py-6">No new warnings</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-3 hover:bg-background border-b border-gray-50 cursor-pointer">
                          <p className="text-xs font-bold text-textMain">{n.title}</p>
                          <p className="text-2xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            {user && (
              <div className="flex items-center space-x-3 border-l border-gray-100 pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-textMain">{user.firstName} {user.lastName}</p>
                  <p className="text-3xs font-extrabold text-primary uppercase tracking-wider">{user.role}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-full transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-background/50 relative">
          {children}
        </main>
      </div>

      {/* Copyright About modal dialog */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-100 w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary text-3xl mx-auto">🐄</div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-poppins text-textMain">Aadhi Bhairava Cow Farm</h3>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Enterprise Dairy Management System</p>
                <p className="text-xs text-gray-500 font-semibold">Version 1.0.0 Enterprise Edition</p>
              </div>
            </div>

            <div className="bg-background border border-gray-100 p-4 rounded-2xl space-y-3">
              <div className="text-center">
                <p className="text-3xs font-extrabold uppercase text-gray-400 tracking-wider">Designed, Architected & Developed by</p>
                <p className="text-base font-bold text-textMain mt-1">Velan</p>
                <p className="text-xs text-primary font-bold">Master of Computer Applications (MCA)</p>
                <p className="text-2xs text-gray-500 font-medium mt-0.5">Software Engineer</p>
              </div>
              <div className="border-t border-gray-100 pt-3 text-center">
                <p className="text-3xs font-extrabold uppercase text-gray-400 tracking-wider">Contact & Support</p>
                <p className="text-sm font-bold text-textMain mt-0.5">+91 93444 60611</p>
              </div>
            </div>

            <div className="text-center text-[10px] text-gray-400 leading-relaxed font-inter">
              <p>This software including its code patterns, database structures, UI elements and API mappings is the exclusive property of Velan.</p>
              <p className="mt-1 font-semibold">© 2026 Velan. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
