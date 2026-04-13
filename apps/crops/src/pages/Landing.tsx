import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Droplets, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Globe2, 
  Cattle,
  LineChart,
  History,
  Languages
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const sectors = [
    {
      id: 'crops',
      title: t('sectors.crops.title'),
      description: t('sectors.crops.desc'),
      icon: Sprout,
      color: 'bg-emerald-50 text-emerald-600',
      action: () => navigate('/onboarding'),
      stats: '8.4k+ farmers',
      accent: 'emerald'
    },
    {
      id: 'livestock',
      title: t('sectors.livestock.title'),
      description: t('sectors.livestock.desc'),
      icon: Sprout, // Using Sprout as placeholder, will use better cow icon if available
      color: 'bg-blue-50 text-blue-600',
      action: () => window.open('http://localhost:3000', '_blank'),
      stats: '12k+ herds',
      accent: 'blue'
    },
    {
      id: 'energy',
      title: t('sectors.energy.title'),
      description: t('sectors.energy.desc'),
      icon: Droplets,
      color: 'bg-amber-50 text-amber-600',
      action: () => window.open('http://localhost:5173', '_blank'),
      stats: '₹4.2Cr Yield',
      accent: 'amber'
    }
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVars}
      className="space-y-16 py-12"
    >
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <motion.div 
          variants={itemVars}
          className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase shadow-sm"
        >
          <Zap size={14} className="mr-2 text-emerald-600" /> {t('nexus.tagline')}
        </motion.div>
        
        <motion.h1 
          variants={itemVars}
          className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.95]"
        >
          {t('nexus.title')} <br/>
          <span className="text-emerald-600 bg-clip-text">{t('nexus.subtitle')}</span>
        </motion.h1>

        <motion.p 
          variants={itemVars}
          className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto"
        >
          {t('nexus.description')}
        </motion.p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectors.map((sector) => (
          <motion.div 
            key={sector.id}
            variants={itemVars}
            whileHover={{ y: -8 }}
            className="group glass-card rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 relative overflow-hidden"
          >
            <div className={`w-16 h-16 rounded-2xl ${sector.color} flex items-center justify-center mb-8 shadow-sm`}>
              <sector.icon size={32} />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{sector.title}</h3>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  {sector.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-1.5">
                  <LineChart size={14} className="text-emerald-500" /> {sector.stats}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <History size={14} /> LIVE
                </div>
              </div>

              <button 
                onClick={sector.action}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 group-hover:scale-[1.02] active:scale-95 duration-300"
              >
                {t('nexus.launch')} <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Banner */}
      <motion.section 
        variants={itemVars}
        className="bg-white border border-slate-200/50 rounded-[3rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 premium-shadow"
      >
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.25em]">
            <ShieldCheck size={18} /> {t('nexus.securityHeader')}
          </div>
          <h3 className="text-3xl font-black text-slate-900 leading-tight">
            {i18n.language === 'hi' ? 'बैंकिंग स्तर की एन्क्रिप्शन' : 'Banking Grade Encryption'}
          </h3>
          <p className="text-slate-500 font-medium max-w-sm">
            {t('nexus.securityDesc')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-center md:text-left">
            <div className="text-5xl font-black text-slate-900 tracking-tighter italic">99.9<span className="text-emerald-500 font-black">%</span></div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">{t('nav.onboarding')} STATUS</div>
          </div>
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Globe2 size={48} className="text-slate-200" />
            </div>
            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-3">GLOBAL ACCESS</div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
