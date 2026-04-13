import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Mocking Google Auth delay
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-12 premium-shadow border border-slate-200/50 relative overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50/50 rounded-full blur-3xl animate-pulse" />
        
        <div className="space-y-10 relative z-10 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 mx-auto flex items-center justify-center shadow-2xl shadow-slate-900/10">
              <span className="text-white font-black text-2xl">Q</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                {t('auth.login')}
              </h1>
              <p className="text-slate-500 font-medium">
                {i18n.language === 'hi' 
                  ? 'सुरक्षित गूगल लॉगिन के साथ क्वांटम नेटवर्क में प्रवेश करें' 
                  : 'Join the Quantum Network with secure Google Identity'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center gap-4 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-slate-900 font-black uppercase tracking-widest text-xs">
                    {i18n.language === 'hi' ? 'गूगल के साथ जारी रखें' : 'Continue with Google'}
                  </span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <Globe2 size={14} /> Global_Identity_Proof_v2
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex items-center gap-4 justify-center">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={16} /> 256_Bit_Verified
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest">
              <CheckCircle2 size={16} /> Indian_Gateway_Ready
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
