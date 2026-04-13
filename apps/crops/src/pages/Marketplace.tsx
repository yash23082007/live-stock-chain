import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ShoppingCart,
  Zap,
  Sprout,
  Droplets,
  Tag,
  Clock,
  ExternalLink
} from 'lucide-react';

const marketplaceItems = [
  { id: '1', name: 'Seed Token #44-A', sector: 'Agri', price: '₹4,200', trend: '+2.4%', type: 'Credit', icon: Sprout },
  { id: '2', name: 'Gir Cow NFT Passport', sector: 'Bio', price: '₹1,24,000', trend: '+12%', type: 'Asset', icon: Zap },
  { id: '3', name: 'Petro-Share: Well 99', sector: 'Energy', price: '₹85,400', trend: '-0.4%', type: 'Fractional', icon: Droplets },
  { id: '4', name: 'Harvest Hedge 2026', sector: 'Agri', price: '₹12,000', trend: 'Stable', type: 'Insurance', icon: Sprout },
  { id: '5', name: 'Sahiwal Pedigree Cert', sector: 'Bio', price: '₹42,000', trend: '+5.2%', type: 'Asset', icon: Zap },
  { id: '6', name: 'Solar Array B-12', sector: 'Energy', price: '₹14,500', trend: '+1.8%', type: 'Fractional', icon: Droplets },
];

export function MarketplacePage() {
  const { t } = useTranslation();
  const [activeSector, setActiveSector] = useState('All');

  const filteredItems = activeSector === 'All' 
    ? marketplaceItems 
    : marketplaceItems.filter(i => i.sector === activeSector);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[1.25rem] bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Unified Marketplace</h1>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic group-hover:text-emerald-500">Asset_Exchange_Node // Public_v4.2</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200">
            {['All', 'Agri', 'Bio', 'Energy'].map(s => (
              <button 
                key={s}
                onClick={() => setActiveSector(s)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeSector === s ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Exchange Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredItems.map((item, i) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-500 overflow-hidden"
          >
            {/* Header / Type */}
            <div className="flex justify-between items-start mb-8">
              <div className={`p-4 rounded-2xl ${
                item.sector === 'Agri' ? 'bg-emerald-50 text-emerald-600' : 
                item.sector === 'Bio' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
              } group-hover:scale-110 transition-transform duration-500`}>
                <item.icon size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{item.type}</span>
                <div className={`flex items-center gap-1.5 text-xs font-black mt-1 ${
                  item.trend.includes('+') ? 'text-emerald-500' : 
                  item.trend.includes('-') ? 'text-red-500' : 'text-slate-400'
                }`}>
                  {item.trend.includes('+') ? <TrendingUp size={14} /> : 
                   item.trend.includes('-') ? <TrendingDown size={14} /> : null}
                  {item.trend}
                </div>
              </div>
            </div>

            {/* Asset Title & Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-1.5"><Tag size={12} /> {item.sector}_Verified</div>
                <span>•</span>
                <div className="flex items-center gap-1.5"><Clock size={12} /> Live</div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Listing_Price</p>
                <p className="text-2xl font-black text-slate-900 tracking-tighter italic">{item.price}</p>
              </div>
              <button className="p-4 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 shadow-xl shadow-slate-900/10 active:scale-90 transition-all">
                <ShoppingCart size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Banner */}
      <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <TrendingUp size={24} className="text-emerald-600" /> Market_Intelligence_v8
          </h3>
          <p className="text-sm font-bold text-slate-400 max-w-sm">
            Platform-wide assets grew by <span className="text-emerald-600 font-black">12.4%</span> this quarter across all three integrated sectors.
          </p>
        </div>
        <button className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-white border-2 border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm">
          Export_Market_Report <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}
