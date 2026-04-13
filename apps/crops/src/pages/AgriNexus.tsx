import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Sprout, 
  Calendar, 
  Wallet, 
  ArrowRight, 
  Download,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

const yieldData = [
  { crop: 'Wheat', yield: 85, quality: 'A+' },
  { crop: 'Rice', yield: 72, quality: 'A' },
  { crop: 'Corn', yield: 64, quality: 'B+' },
  { crop: 'Soy', yield: 91, quality: 'A++' },
  { crop: 'Cotton', yield: 45, quality: 'B' },
];

const transactions = [
  { id: 'TX-9021', type: 'Credit Issue', asset: 'Kharif Input Pack', amount: '₹12,400', status: 'Settled', date: 'Oct 12, 2026' },
  { id: 'TX-9022', type: 'Repayment', asset: 'Seed Token #44', amount: '₹4,200', status: 'Pending', date: 'Oct 13, 2026' },
  { id: 'TX-9023', type: 'Insurance', asset: 'Weather Hedge', amount: '₹1,500', status: 'Active', date: 'Oct 14, 2026' },
  { id: 'TX-9024', type: 'Credit Issue', asset: 'Harvest Fuel', amount: '₹8,900', status: 'Flagged', date: 'Oct 15, 2026' },
];

export function AgriNexusView() {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {/* Sector Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.25rem] bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
              <Sprout size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Agri-Nexus Terminal</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sector_ID: 0xAgri_Alpha // Punjab_Region</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={14} /> Filter_View
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 font-sans">
            <Wallet size={14} /> Issue_Credit_Token
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Yield Performance */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200/50 relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">Crop_Yield Intensity</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest items-center flex gap-1">
                  <Clock size={12} /> Last_Update: 2m ago
                </p>
              </div>
              <Download size={20} className="text-slate-300 hover:text-slate-600 cursor-pointer" />
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="crop" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: '900' }}
                  />
                  <Bar dataKey="yield" radius={[8, 8, 8, 8]} barSize={40}>
                    {yieldData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#10b981' : '#34d399'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Transaction Table */}
          <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Financial_Vault Log</h3>
              <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">View_All_Transactions</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID_Hash</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset_Class</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Amount</th>
                    <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-mono text-xs font-bold text-slate-500">{tx.id}</td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900">{tx.type}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{tx.asset}</span>
                        </div>
                      </td>
                      <td className="py-4 text-center text-xs font-black text-slate-900">{tx.amount}</td>
                      <td className="py-4 text-right">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          tx.status === 'Settled' ? 'bg-emerald-50 text-emerald-600' : 
                          tx.status === 'Pending' ? 'bg-blue-50 text-blue-600' :
                          tx.status === 'Active' ? 'bg-amber-50 text-amber-600' : 
                          'bg-red-50 text-red-600'
                        }`}>
                          {tx.status === 'Settled' && <CheckCircle2 size={10} />}
                          {tx.status === 'Pending' && <Clock size={10} />}
                          {tx.status === 'Flagged' && <AlertCircle size={10} />}
                          {tx.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Widgets */}
        <div className="space-y-8">
          {/* Credit Limit Card */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Available_Credit</span>
                <Wallet className="text-emerald-500" size={24} />
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-black tracking-tighter">₹4,20,000</h2>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Next Repayment: Nov 15</p>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-emerald-500" />
              </div>
              <button className="w-full py-4 rounded-2xl bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-white transition-all">
                Repay_Tokens_Instant
              </button>
            </div>
          </div>

          {/* Weather Insurance Status */}
          <div className="glass-card p-8 rounded-[2.5rem] border border-slate-200/50 space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Weather_Index Vault</h3>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-blue-600 flex items-center justify-center">
                <ArrowRight size={32} className="-rotate-45" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900">Current Hazard Level: LOW</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Precipitation: 12.4mm // Expected: 10.0mm</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Coverage</p>
                <p className="text-xs font-black text-slate-900">₹2.4Cr</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Premium</p>
                <p className="text-xs font-black text-emerald-600">0.02% / Mo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
