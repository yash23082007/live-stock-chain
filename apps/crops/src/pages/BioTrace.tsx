import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  History, 
  ShieldCheck, 
  FileCheck, 
  MapPin, 
  Dna, 
  CheckCircle2, 
  MoreHorizontal,
  ChevronRight,
  Stethoscope,
  Activity
} from 'lucide-react';

const herdSummary = [
  { id: 'ANIM-0042', breed: 'Gir Cow', health: 'Optimal', age: '3.4y', status: 'Ready_For_Auction' },
  { id: 'ANIM-0043', breed: 'Sahiwal', health: 'Vaccinating', age: '1.2y', status: 'Quarantine' },
  { id: 'ANIM-0044', breed: 'Murrah', health: 'Optimal', age: '4.8y', status: 'Main_Ledger' },
  { id: 'ANIM-0045', breed: 'Gir Cow', health: 'Monitoring', age: '2.1y', status: 'Observation' },
];

export function BioTraceView() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {/* Sector Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.25rem] bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
              <Dna size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Bio-Trace Terminal</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: ERC-721_Passport // Genetic_Proof_v8</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all font-sans">
            Scanner_Sync
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 font-sans">
            Mint_NFT_Passport
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Passport Explorer */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Herd_Registry Explorer</h3>
              <div className="flex gap-4 text-[10px] font-black uppercase text-slate-400">
                <span className="text-blue-600 underline">ALL_ASSETS</span>
                <span>VERIFIED_ONLY</span>
              </div>
            </div>
            <div className="space-y-4">
              {herdSummary.map((animal) => (
                <div key={animal.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-100/50 flex flex-col md:flex-row items-center gap-6 group hover:border-blue-500 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black italic shadow-lg shadow-blue-500/10">
                    #{animal.id.split('-')[1]}
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    <div>
                      <p className="text-[8px] font-black uppercase text-slate-400 italic">Breed_Type</p>
                      <p className="text-xs font-black text-slate-900">{animal.breed}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-slate-400 italic">Vitals_Status</p>
                      <p className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {animal.health}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase text-slate-400 italic">System_Age</p>
                      <p className="text-xs font-black text-slate-900">{animal.age}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-[8px] font-black uppercase text-slate-400 italic">Ledger_State</p>
                      <p className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase truncate max-w-[100px]">{animal.status}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                <MapPin size={24} className="text-blue-400" /> Geospatial_Provenance Trace
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 space-y-2">
                    <p className="text-[8px] font-black text-slate-500 uppercase">Step_0{i}</p>
                    <p className="text-[10px] font-black text-white">Punjab_Cluster_{i*2}2</p>
                    <div className="text-[8px] font-bold text-emerald-400 font-mono">0x4F...Valid</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 font-bold leading-relaxed max-w-lg">
                Visualizing the immutable movement history of currently selected asset batch. All points are anchor-verified by IoT ear-tag identifiers and GPS-locked.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Health & Credentials */}
        <div className="space-y-8">
          <div className="p-10 rounded-[2.5rem] border border-slate-200/50 glass-card space-y-8 relative overflow-hidden">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
              <Stethoscope size={20} className="text-blue-600" /> Clinical_History
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Anthrax Vaccination', date: 'Oct 04', status: 'Verified', color: 'text-emerald-500' },
                { label: 'Weight Analysis', date: 'Oct 08', status: 'Pending', color: 'text-amber-500' },
                { label: 'Genetic Audit', date: 'Oct 12', status: 'Verified', color: 'text-emerald-500' },
              ].map((log) => (
                <div key={log.label} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors" />
                    <div>
                      <p className="text-xs font-black text-slate-900">{log.label}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{log.date}, 2026</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${log.color}`}>{log.status}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 rounded-2xl border-2 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-all">
              Request_Vet_Audit
            </button>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <CheckCircle2 size={32} />
                <h2 className="text-2xl font-black tracking-tight leading-tight">Biometric_Auth Vault Active</h2>
              </div>
              <p className="text-blue-100 text-xs font-medium leading-relaxed opacity-80">
                All herd health data is encrypted via hardware-level TEE modules ensuring Zero-Knowledge proofing for insurance providers.
              </p>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 italic">Network_Identity</p>
                <p className="text-xs font-bold truncate">Q_BIO_SECURE_NODE_9021_ALPHA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
