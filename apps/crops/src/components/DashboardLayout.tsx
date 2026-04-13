import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Sprout, 
  Droplets, 
  Warehouse, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Nexus Hub', path: '/', icon: LayoutDashboard },
    { name: 'Agri-Nexus', path: '/agri', icon: Sprout },
    { name: 'Bio-Trace', path: '/onboarding', icon: Warehouse },
    { name: 'Energy-Yield', path: '/energy', icon: Droplets },
    { name: 'Marketplace', path: '/marketplace', icon: BarChart3 },
    { name: 'About Protocol', path: '/about', icon: ShieldCheck },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#f8faf7] flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200/60 relative z-50 flex flex-col transition-all duration-500 ease-in-out"
      >
        {/* Logo */}
        <div className="p-6 h-20 flex items-center justify-between border-b border-slate-100/50">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/10">
              <span className="text-white font-black text-xl">Q</span>
            </div>
            {isSidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col"
              >
                <span className="font-black text-lg tracking-tighter text-slate-900 leading-none">QUANTUM</span>
                <span className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase mt-0.5">Nexus_OS</span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                isActive(item.path) 
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} className={isActive(item.path) ? 'text-emerald-600' : 'group-hover:text-slate-900'} />
              {isSidebarOpen && (
                <span className="font-black text-xs uppercase tracking-widest">{item.name}</span>
              )}
              {isActive(item.path) && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute right-2 w-1.5 h-1.5 rounded-full bg-emerald-500"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile / Status */}
        <div className="p-4 border-t border-slate-100/50 bg-slate-50/50">
          <div className="flex items-center gap-3 px-2 py-2">
            <UserCircle size={24} className="text-slate-400" />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-900">Arjun Singh</span>
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Amoy_Mainnet
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Navigation */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-slate-200/50 px-8 flex items-center justify-between z-40 sticky top-0">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Scanner: Assets, Hashes, Farmers" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/50 border border-slate-200/30 text-xs font-bold focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-emerald-500 transition-all">
              English_v1
            </button>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 cursor-pointer transition-all relative">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-12 relative custom-scrollbar">
          <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-emerald-50/30 blur-[120px] -z-10 rounded-full" />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
