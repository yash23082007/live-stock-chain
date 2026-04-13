import React from 'react';
import { Sprout, Bird, Droplets, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const sectors = [
    {
      id: 'crops',
      title: 'Agro-Credit Nexus',
      subtitle: 'Crop Finance & Input Tokens',
      description: 'Tokenized agricultural credit for seeds, fertilizers, and hardware. Real-time repayment tracking and marketplace integration.',
      icon: Sprout,
      color: 'from-emerald-600 to-teal-400',
      action: () => navigate('/onboarding'),
      status: 'Blockchain: Mainnet Online'
    },
    {
      id: 'livestock',
      title: 'Bio-Trace Protocol',
      subtitle: 'Livestock NFTs & Traceability',
      description: 'Immutable health passports and provenance tracking for cattle. ERC-721 tokenization of biological assets with 11-language support.',
      icon: Bird, // Using Bird as a proxy for 'Life/Livestock' since Cow isn't in standard Lucide sometimes, but actually Lucide has 'Beef' or 'Milk' or 'PawPrint'. Let's use 'Bird' or 'PawPrint'.
      color: 'from-blue-600 to-cyan-400',
      action: () => window.location.href = 'http://localhost:3000', // Assuming default livestock port
      status: 'Network: Polygon Amoy'
    },
    {
      id: 'energy',
      title: 'Petro-Yield Systems',
      subtitle: 'Energy Asset Fractionalization',
      description: 'Real-world asset (RWA) tokens for oil production. Automated revenue distribution and fractional equity units for verified holders.',
      icon: Droplets,
      color: 'from-amber-600 to-amber-400',
      action: () => window.location.href = 'http://localhost:5173', // Assuming default energy port
      status: 'Audit: Proof-of-Reserve Active'
    }
  ];

  return (
    <div className="space-y-12 py-10">
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase">
          <Zap size={12} className="mr-2" /> Unified RWA Protocol
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
          The Quantum <span className="text-emerald-600">Nexus</span>
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed">
          The world's first integrated blockchain platform bridging Agricultural Finance, 
          Livestock Traceability, and Global Energy Markets.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectors.map((sector) => (
          <div 
            key={sector.id}
            className="group relative bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Glow */}
            <div className={`absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br ${sector.color} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`} />
            
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${sector.color} flex items-center justify-center text-white mb-8 shadow-lg`}>
              <sector.icon size={28} />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sector.subtitle}</h3>
                <h2 className="text-2xl font-bold text-slate-800">{sector.title}</h2>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                {sector.description}
              </p>

              <div className="pt-6">
                <button 
                  onClick={sector.action}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 group-hover:shadow-emerald-500/20`}
                >
                  Launch Terminal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">
                  {sector.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 rounded-[2.5rem] p-10 mt-20 relative overflow-hidden text-white border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/10 to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-3">
              <Shield className="text-emerald-400" /> Enterprise Security
            </h3>
            <p className="text-slate-400 max-w-md">
              All transactions are encrypted and anchored on public ledgers with SHA-256 integrity proofs.
            </p>
          </div>
          <div className="flex gap-12 text-center">
            <div>
              <div className="text-3xl font-black">99.9%</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-black">2.4k+</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Live Nodes</div>
            </div>
            <div className="hidden sm:block">
              <div className="text-3xl font-black text-emerald-400"><Globe size={32} /></div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Global</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
