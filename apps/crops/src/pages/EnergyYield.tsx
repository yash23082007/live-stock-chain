import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Droplets, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  ShieldCheck, 
  Thermometer, 
  Gauge, 
  DollarSign,
  Box
} from 'lucide-react';

const productionData = [
  { time: '00:00', barrels: 420 },
  { time: '04:00', barrels: 380 },
  { time: '08:00', barrels: 512 },
  { time: '12:00', barrels: 490 },
  { time: '16:00', barrels: 610 },
  { time: '20:00', barrels: 580 },
  { time: '23:59', barrels: 625 },
];

export function EnergyYieldView() {
  const { t } = useTranslation();

  const metrics = [
    { label: 'Asset_ID', value: 'TX-WELL-99', icon: Box },
    { label: 'Flow_Rate', value: '42.4 bbl/h', icon: Gauge },
    { label: 'Core_Temp', value: '184°F', icon: Thermometer },
    { label: 'Uptime_v2', value: '99.98%', icon: Activity },
  ];

  return (
    <div className="space-y-10">
      {/* Sector Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.25rem] bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
              <Droplets size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Energy-Yield Terminal</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol: Proof-Of-Reserve // OPEC_Standard_v4</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
            Live_Market_Syncing
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={m.label} className="p-6 rounded-[2rem] bg-white border border-slate-200/50 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              <m.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
              <h3 className="text-xl font-black text-slate-900">{m.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Production Chart */}
        <div className="lg:col-span-2 glass-card p-10 rounded-[2.5rem] border border-slate-200/50">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
              <Zap size={20} className="text-amber-500" /> Real-Time_Production (Output)
            </h3>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Unit: Barrels_Equivalent</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <defs>
                  <linearGradient id="colorBarrels" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey="barrels" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorBarrels)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Widget */}
        <div className="space-y-8">
          <div className="p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 -skew-x-12 translate-x-20" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Your_Fractional_Share</p>
                <h2 className="text-5xl font-black tracking-tighter italic">2.45<span className="text-xl text-slate-500">%</span></h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-500 uppercase">Est_Daily_ROI</p>
                  <p className="text-sm font-black text-emerald-400">₹14,200</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-500 uppercase">Valuation</p>
                  <p className="text-sm font-black text-white">₹85.4L</p>
                </div>
              </div>
              <button className="w-full py-4 rounded-2xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-amber-500/0 hover:shadow-amber-500/20">
                Diversify_Holdings <ArrowUpRight size={14} className="inline ml-1" />
              </button>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border border-slate-200/50 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" /> Proof-of-Reserve_Vault
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-500 italic">Global_Audit #882</span>
                <span className="font-black text-emerald-600 uppercase tracking-tighter underline">Verified_Cert</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 font-mono text-[9px] text-slate-400 leading-none truncate">
                0x8823...A11E_F942...420A_SaaS_Asset_Proof
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
