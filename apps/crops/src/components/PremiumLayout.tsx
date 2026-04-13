import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function PremiumLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-900/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xl leading-none">Q</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter text-slate-900 uppercase">Quantum</span>
            </Link>
            
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/onboarding" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">{t('onboarding')}</Link>
              <Link to="/marketplace" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">{t('marketplace')}</Link>
              <Link to="/harvest-report" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">{t('report')}</Link>
              
              <select 
                onChange={changeLanguage} 
                defaultValue={i18n.language}
                className="ml-4 text-sm font-medium bg-slate-100/50 border border-slate-200 text-slate-700 rounded-full px-3 py-1.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="or">ଓଡ଼ିଆ (Odia)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative animate-fade-in-up">
        {children}
      </main>
    </div>
  );
}
