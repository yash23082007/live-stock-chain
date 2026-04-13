import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mocking API delay
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-10 premium-shadow border border-slate-200/50 relative overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl" />
        
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 relative z-10"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {t('auth.login')}
                </h1>
                <p className="text-slate-500 font-medium">
                  {i18n.language === 'hi' ? 'अपने मोबाइल नंबर से सुरक्षित प्रवेश करें' : 'Secure access via your mobile number'}
                </p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
                    {t('auth.phone')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <span className="font-bold text-sm">+91</span>
                    </div>
                    <input 
                      type="tel"
                      required
                      placeholder="98765-43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none font-bold text-slate-900 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary h-14 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <> {t('auth.submit')} <ArrowRight size={18} /> </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100/50">
                <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                <p className="text-[10px] font-bold text-emerald-800 leading-snug uppercase tracking-wider">
                  {t('nexus.securityDesc')}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 relative z-10"
            >
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                <ChevronLeft size={16} /> {i18n.language === 'hi' ? 'वापस' : 'Back'}
              </button>

              <div className="space-y-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {t('auth.otp')}
                </h1>
                <p className="text-slate-500 font-medium">
                  {i18n.language === 'hi' ? 'सत्यापन कोड दर्ज करें' : 'Enter the verification code'}
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-between gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-full h-14 text-center rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none font-black text-xl text-slate-900 transition-all"
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary h-14 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <> {i18n.language === 'hi' ? 'सत्यापित करें' : 'Verify & Launch'} <CheckCircle2 size={18} /> </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-emerald-600 transition-colors">
                {i18n.language === 'hi' ? 'कोड फिर से भेजें' : 'Resend Code'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
