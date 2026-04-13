import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowUpRight,
  Activity,
  History,
  Info
} from 'lucide-react';

const mockChartData = [
  { name: 'Mon', value: 400, growth: 240 },
  { name: 'Tue', value: 300, growth: 139 },
  { name: 'Wed', value: 600, growth: 980 },
  { name: 'Thu', value: 800, growth: 390 },
  { name: 'Fri', value: 500, growth: 480 },
  { name: 'Sat', value: 900, growth: 380 },
  { name: 'Sun', value: 1100, growth: 430 },
];

export function NexusHub() {
  const { t, i18n } = useTranslation();

  const stats = [
    { title: 'Total Asset Value', value: '₹14.2Cr', growth: '+12.5%', icon: TrendingUp, color: 'text-emerald-600' },
    { title: 'Verified Farmers', value: '8,432', growth: '+2.4k', icon: Users, color: 'text-blue-600' },
    { title: 'Active Yield Projects', value: '42', growth: '4 New', icon: Zap, color: 'text-amber-600' },
    { title: 'Vault Assurance', value: '99.9%', growth: 'Audited', icon: ShieldCheck, color: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200/50">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 leading-none">
            {i18n.language === 'hi' ? 'क्वांटम नेक्सस डैशबोर्ड' : 'Quantum_Nexus Dashboard'}
          </h1>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
            Operational_Status: <span className="text-emerald-500">OPTIMAL</span> // v2.4.0
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10">
            Export_Registry
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[2rem] border border-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={20} />
              </div>
              <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.growth}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-slate-200/50 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
              <Activity size={20} className="text-emerald-500" /> Platform_Growth_Vitals
            </h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Assets
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400 ml-4">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Users
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                    fontWeight: '900'
                  }} 
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                <Area type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={4} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="glass-card p-8 rounded-[2.5rem] border border-slate-200/50 flex flex-col">
          <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
            <History size={20} className="text-blue-500" /> Live_Registry_Log
          </h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-4 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <ShieldCheck size={18} />
                  </div>
                  {item < 5 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-100" />}
                </div>
                <div className="flex flex-col gap-0.5 pt-1">
                  <p className="text-xs font-black text-slate-900 leading-tight">Asset_Validation_Hash: 0x4E...{item}F</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validated in Block #12,49{item}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 rounded-2xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
            View All Events <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Informational Banner */}
      <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 -skew-x-12 translate-x-32 group-hover:translate-x-28 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
              <Info size={20} className="text-emerald-400" /> {t('about.missionTitle')}
            </h3>
            <p className="text-slate-400 text-sm font-medium max-w-xl">
              {t('about.missionDesc')}
            </p>
          </div>
          <button className="px-8 py-4 rounded-xl bg-emerald-500 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 whitespace-nowrap">
            Read_Blueprint
          </button>
        </div>
      </div>
    </div>
  );
}
