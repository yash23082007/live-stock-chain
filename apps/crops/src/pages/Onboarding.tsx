import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  MapPin, 
  FileCheck, 
  Eye, 
  ArrowRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';

const personalInfoSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().regex(/^\+91[0-9]{10}$/, 'Valid Indian phone (+91) required'),
  nationalId: z.string().min(12).max(12), // Aadhaar usually
  dateOfBirth: z.string()
});

const steps = [
  { id: 'personal', icon: User },
  { id: 'farm', icon: MapPin },
  { id: 'kyc', icon: FileCheck },
  { id: 'review', icon: Eye }
];

export function OnboardingPage() {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(personalInfoSchema)
  });

  const nextStep = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(s => Math.min(steps.length - 1, s + 1));
  };

  const prevStep = () => setStep(s => Math.max(0, s - 1));

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      {/* Premium Stepper */}
      <div className="flex justify-between items-center relative px-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-200 -z-10" />
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-col items-center gap-3">
            <motion.div 
              initial={false}
              animate={{ 
                backgroundColor: i <= step ? '#059669' : '#fff',
                borderColor: i <= step ? '#059669' : '#e2e8f0',
                color: i <= step ? '#fff' : '#64748b'
              }}
              className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center shadow-lg relative bg-white transition-colors duration-500"
            >
              <s.icon size={20} />
              {i < step && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"
                >
                  <CheckCircle2 size={14} className="text-emerald-600" />
                </motion.div>
              )}
            </motion.div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${i <= step ? 'text-emerald-700' : 'text-slate-400'}`}>
              {i18n.language === 'hi' ? ['व्यक्तिगत', 'फ़ार्म', 'केवाईसी', 'समीक्षा'][i] : s.id}
            </span>
          </div>
        ))}
      </div>

      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-[2.5rem] p-12 premium-shadow"
      >
        <form onSubmit={handleSubmit(nextStep)} className="space-y-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {i18n.language === 'hi' ? 'अपनी पहचान साझा करें' : 'Share Your Identity'}
                  </h2>
                  <p className="text-slate-500 font-medium italic">Step 01 / Basic Ledger Setup</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">First Name</label>
                    <input {...register('firstName')} placeholder="Arjun" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none font-bold transition-all" />
                    {errors.firstName && <p className="text-xs text-red-500 font-bold">{errors.firstName.message as string}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Last Name</label>
                    <input {...register('lastName')} placeholder="Singh" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none font-bold transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 pl-1">Aadhaar Number (UIDAI)</label>
                  <input {...register('nationalId')} placeholder="1234 5678 9012" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none font-bold tracking-[0.2em] transition-all" />
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Farm Assets</h2>
                  <p className="text-slate-500 font-medium italic">Step 02 / Asset Registry</p>
                </div>
                <div className="space-y-4">
                  <input placeholder="Land Area (Acres)" type="number" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold" />
                  <input placeholder="Soil Type (Khadar/Bangur)" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none font-bold" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Digital Documents</h2>
                  <p className="text-slate-500 font-medium italic">Step 03 / Proof of Ownership</p>
                </div>
                <div className="border-4 border-dashed border-slate-100 p-16 text-center rounded-[2rem] hover:border-emerald-200 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <FileCheck className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={32} />
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Click to upload Khasra/Khatauni</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div className="space-y-8">
                <div className="space-y-2 text-center pb-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Final Registry Scan</h2>
                  <p className="text-slate-500 font-medium italic italic">Ready for Blockchain Submission</p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 font-mono text-xs">
                  <pre className="whitespace-pre-wrap text-slate-600 leading-relaxed uppercase">
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 0}
              className="flex items-center gap-2 px-8 py-3 rounded-2xl border-2 border-slate-200 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:bg-slate-50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              type="submit"
              className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
            >
              {step === steps.length - 1 ? 'Execute Protocol' : 'Proceed'} <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
