import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Languages, Shield, LayoutDashboard, ShoppingBag, Fingerprint } from 'lucide-react';

export function PremiumLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <div className="min-h-screen bg-[#f8faf7] font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <nav className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/60 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-2xl shadow-slate-900/10 group-hover:scale-105 transition-transform duration-500">
              <span className="text-white font-black text-xl leading-none">Q</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-slate-900 leading-tight uppercase">Quantum</span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase leading-none">Protocol</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-slate-500">
              <Link to="/onboarding" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                <Fingerprint size={16} /> {t('nav.onboarding')}
              </Link>
              <Link to="/marketplace" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                <ShoppingBag size={16} /> {t('nav.marketplace')}
              </Link>
              <Link to="/harvest-report" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                <LayoutDashboard size={16} /> {t('nav.dashboard')}
              </Link>
            </div>

            <div className="flex items-center space-x-4 pl-8 border-l border-slate-200">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-600 hover:text-emerald-600 transition-all text-xs font-black uppercase tracking-wider"
              >
                <Languages size={14} /> 
                {i18n.language === 'en' ? 'हिन्दी' : 'English'}
              </button>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black tracking-widest uppercase">
                <Shield size={12} /> {t('nexus.tagline')}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-[500px] bg-emerald-100/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-[400px] bg-blue-100/30 blur-[100px] rounded-full" />
        {children}
      </main>

      <footer className="mt-20 border-t border-slate-200/50 py-12 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">
            © 2026 QUANTUM_AGRICULTURE_SYSTEMS // {new Date().getFullYear()}
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-emerald-600 transition-all">Network_Status</Link>
            <Link href="/" className="hover:text-emerald-600 transition-all">Audit_Log</Link>
            <Link href="/" className="hover:text-emerald-600 transition-all">Policy_Registry</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
