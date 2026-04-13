import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Cpu, 
  Network, 
  Leaf, 
  Beef, 
  Flame, 
  ArrowRight,
  Database,
  Globe,
  FileCode2
} from 'lucide-react';

export function AboutView() {
  const { t, i18n } = useTranslation();

  const technicalPillars = [
    { 
      title: 'Smart Ledger Integration', 
      desc: 'Immutable state management using Polygon Amoy Mainnet with SHA-256 integrity proofs.',
      icon: Database 
    },
    { 
      title: 'Multilingual NLP', 
      desc: 'End-to-end support for 11 Indian regional languages including Hindi and Bengali script rendering.',
      icon: Globe 
    },
    { 
      title: 'Asset Tokenization', 
      desc: 'ERC-721 and ERC-1155 standards applied to biological and physical RWA (Real World Assets).',
      icon: FileCode2 
    }
  ];

  const sectorDeepDive = [
    { 
      name: 'Agri-Nexus', 
      icon: Leaf, 
      color: 'bg-emerald-50 text-emerald-600',
      details: 'Bridging the liquidity gap for smallholder farmers via tokenized input-financing. Real-time soil and yield data feeds into credit scoring.'
    },
    { 
      name: 'Bio-Trace', 
      icon: Leaf, // Using Leaf as Beef proxy if Beef not available in Lucide version
      color: 'bg-blue-50 text-blue-600',
      details: 'Blockchain passports for cattle and poultry. Traceability from birth to marketplace ensuring provenance and health compliance.'
    },
    { 
      name: 'Energy-Yield', 
      icon: Flame, 
      color: 'bg-amber-50 text-amber-600',
      details: 'Democratizing energy asset ownership. Fractionalized shares in high-production oil wells and solar arrays with automated ROI.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 py-10">
      {/* Hero Header */}
      <section className="text-center space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-slate-900/10"
        >
          <ShieldCheck size={14} className="text-emerald-400" /> Protocol_Architecture_v2
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]"
        >
          THE QUANTUM <br/>
          <span className="text-emerald-600">NEXUS_OS</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          {i18n.language === 'hi' 
            ? 'भारत के कृषि, पशुधन और ऊर्जा क्षेत्रों को सशक्त बनाने के लिए एक एकीकृत ब्लॉकचेन पारिस्थितिकी तंत्र।'
            : 'A unified blockchain ecosystem engineered to bridge the trust gap in India\'s Agriculture, Livestock, and Energy sectors.'}
        </motion.p>
      </section>

      {/* Technical Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technicalPillars.map((pillar, i) => (
          <motion.div 
            key={pillar.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="p-8 rounded-[2rem] bg-white border border-slate-200/60 shadow-xl shadow-slate-200/20 group hover:border-emerald-500 transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">
              <pillar.icon size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-3 tracking-tight uppercase">{pillar.title}</h3>
            <p className="text-sm text-slate-400 font-bold leading-relaxed">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Sector Deep Dive */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">The Three-in-One Engine</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Sectoral_Performance_Logic</p>
          </div>
        </div>

        <div className="space-y-6">
          {sectorDeepDive.map((sector, i) => (
            <motion.div 
              key={sector.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group glass-card p-10 rounded-[2.5rem] border border-slate-200/40 flex flex-col md:flex-row gap-10 items-center hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700"
            >
              <div className={`w-24 h-24 rounded-[2rem] ${sector.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                <sector.icon size={48} />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl font-black text-slate-900">{sector.name}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {sector.details}
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">
                    <ShieldCheck size={14} /> LIVE_ON_LEDGER
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl">
                    <Cpu size={14} /> SMART_CONTRACT_V4
                  </div>
                </div>
              </div>
              <button className="p-5 rounded-full bg-slate-900 text-white hover:bg-emerald-600 transition-all group-hover:translate-x-2">
                <ArrowRight size={24} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Blueprint Info */}
      <section className="bg-slate-900 rounded-[3rem] p-16 text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl font-black capitalize">Ready to Explore the Ecosystem?</h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto">
            Quantum Nexus isn't just a platform; it's the digital infrastructure for the new Indian industrial revolution.
          </p>
        </div>
        <div className="relative z-10 pt-4 flex justify-center gap-6">
          <button className="px-10 py-4 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-emerald-400 transition-all">
            Launch_Hub
          </button>
          <button className="px-10 py-4 rounded-2xl border-2 border-slate-700 text-slate-400 font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">
            Audit_Logs
          </button>
        </div>
      </section>
    </div>
  );
}
