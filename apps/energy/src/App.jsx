import React, { useState, useReducer, useEffect, useMemo } from 'react';
import { 
  Droplets, BarChart3, Users, ArrowUpRight, ArrowDownRight, DollarSign, 
  Zap, Clock, ChevronRight, TrendingUp, CreditCard, Plus, Shield, 
  Search, Bell, Settings, Filter, Download, CheckCircle2, AlertCircle,
  MoreHorizontal, Wallet, Globe, Lock
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- INITIAL STATE & TYPES ---
const INITIAL_STATE = {
  wells: [
    { id: 'w1', name: 'Midland Base #04', production: 425.8, price: 82.40, status: 'Active', health: 98, region: 'Permian' },
    { id: 'w2', name: 'Eagle Ford X-12', production: 120.5, price: 81.10, status: 'Maintenance', health: 45, region: 'Gulf Coast' },
    { id: 'w3', name: 'Bakken Prime', production: 310.2, price: 83.50, status: 'Active', health: 92, region: 'Williston' }
  ],
  holders: [
    { id: 'h1', name: 'Alpha Capital', units: 2500, verified: true, totalPayout: 125000, joinDate: '2023-01-15' },
    { id: 'h2', name: 'West-Tex Trust', units: 1500, verified: true, totalPayout: 75000, joinDate: '2023-03-22' },
    { id: 'h3', name: 'Petro Holdings', units: 1200, verified: true, totalPayout: 60000, joinDate: '2023-06-10' },
    { id: 'h4', name: 'S. Richards', units: 800, verified: false, totalPayout: 0, joinDate: '2024-02-05' },
    { id: 'h5', name: 'Community Fund', units: 4000, verified: true, totalPayout: 200000, joinDate: '2022-11-12' },
  ],
  history: [
    { id: 'tx_001', date: '2024-03-01', amount: 150000, status: 'Completed', hash: '0x7d...f2a', type: 'Revenue Share' },
    { id: 'tx_002', date: '2024-02-01', amount: 120000, status: 'Completed', hash: '0xa4...e1b', type: 'Revenue Share' },
  ],
  settings: {
    platformFee: 0.5,
    royaltyRate: 12.5,
    taxRate: 4.5,
    currency: 'USD'
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'DISTRIBUTE': {
      const { amount } = action.payload;
      const fee = amount * (state.settings.platformFee / 100);
      const royalty = amount * (state.settings.royaltyRate / 100);
      const tax = amount * (state.settings.taxRate / 100);
      const netAmount = amount - fee - royalty - tax;
      
      const totalUnits = state.holders.reduce((acc, h) => acc + h.units, 0);
      
      const updatedHolders = state.holders.map(h => {
        if (!h.verified) return h;
        const share = (h.units / totalUnits) * netAmount;
        return { ...h, totalPayout: h.totalPayout + share };
      });

      const newHistory = [{
        id: `tx_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        amount,
        status: 'Completed',
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
        type: 'Revenue Share'
      }, ...state.history];

      return { ...state, holders: updatedHolders, history: newHistory };
    }
    case 'TOGGLE_VERIFY': {
      return {
        ...state,
        holders: state.holders.map(h => h.id === action.payload ? { ...h, verified: !h.verified } : h)
      };
    }
    case 'ADD_HOLDER': {
      return { ...state, holders: [...state.holders, action.payload] };
    }
    case 'UPDATE_WELL': {
      return {
        ...state,
        wells: state.wells.map(w => w.id === action.payload.id ? { ...w, ...action.payload.updates } : w)
      };
    }
    default:
      return state;
  }
}

// --- COMPONENTS ---

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px',
      backgroundColor: active ? '#f1f5f9' : 'transparent',
      color: active ? '#0f172a' : '#64748b', cursor: 'pointer', marginBottom: '4px',
      fontWeight: active ? '600' : '500', fontSize: '14px', transition: 'all 0.2s ease'
    }}
  >
    <Icon size={18} />
    {label}
  </div>
);

const Badge = ({ children, type = 'success' }) => {
  const styles = {
    success: { bg: '#ecfdf5', text: '#059669' },
    warning: { bg: '#fffbeb', text: '#d97706' },
    danger: { bg: '#fef2f2', text: '#dc2626' },
    info: { bg: '#eff6ff', text: '#2563eb' }
  };
  const s = styles[type] || styles.info;
  return (
    <span style={{ 
      padding: '4px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: '700',
      backgroundColor: s.bg, color: s.text, textTransform: 'uppercase', letterSpacing: '0.05em'
    }}>
      {children}
    </span>
  );
};

// --- MAIN APP ---

export default function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE, (initial) => {
    const saved = localStorage.getItem('petroshare_state');
    return saved ? JSON.parse(saved) : initial;
  });

  const [activeTab, setActiveTab] = useState('Overview');
  const [isDistributing, setIsDistributing] = useState(false);
  const [distInput, setDistInput] = useState('150000');

  useEffect(() => {
    localStorage.setItem('petroshare_state', JSON.stringify(state));
  }, [state]);

  // Derived Values
  const totalProduction = useMemo(() => state.wells.reduce((acc, w) => acc + w.production, 0), [state.wells]);
  const avgPrice = useMemo(() => state.wells.reduce((acc, w) => acc + w.price, 0) / state.wells.length, [state.wells]);
  const totalHolders = state.holders.length;
  const verifiedHolders = state.holders.filter(h => h.verified).length;

  const handleDistribute = () => {
    setIsDistributing(true);
    setTimeout(() => {
      dispatch({ type: 'DISTRIBUTE', payload: { amount: parseFloat(distInput) } });
      setIsDistributing(false);
      setDistInput('');
      alert('Distribution successful! Audit log updated.');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: 'var(--sidebar-width)', borderRight: '1px solid var(--border-subtle)',
        padding: '32px 24px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ padding: '10px', background: '#0f172a', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(15,23,42,0.2)' }}>
            <Droplets size={24} color="#ffffff" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '20px', letterSpacing: '-0.5px' }}>PetroShare Pro</span>
        </div>

        <nav style={{ flex: 1 }}>
          <NavItem icon={BarChart3} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <NavItem icon={Zap} label="Asset Manager" active={activeTab === 'Assets'} onClick={() => setActiveTab('Assets')} />
          <NavItem icon={Users} label="Token Holders" active={activeTab === 'Holders'} onClick={() => setActiveTab('Holders')} />
          <NavItem icon={Shield} label="Compliance" active={activeTab === 'Compliance'} onClick={() => setActiveTab('Compliance')} />
          <NavItem icon={Clock} label="Audit History" active={activeTab === 'Audit'} onClick={() => setActiveTab('Audit')} />
        </nav>

        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>SYSTEM ONLINE</span>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Network: Mainnet Simulation</div>
        </div>
      </aside>

      {/* Main Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ 
          height: '70px', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px'
        }}>
          <div style={{ position: 'relative', width: '400px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" placeholder="Search wells, hashes, or holders..."
              style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '10px', border: '1px solid #f1f5f9', background: '#f8fafc', fontSize: '14px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <Bell size={20} color="#64748b" />
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid #fff' }}></div>
            </div>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#e2e8f0' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>Admin Operator</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Portfolio Manager</div>
              </div>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#64748b" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
          
          {activeTab === 'Overview' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', color: '#0f172a' }}>Executive Summary</h2>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>Real-time performance across {state.wells.length} active wells.</p>
                </div>
                <button style={{ 
                  backgroundColor: '#0f172a', color: '#fff', padding: '12px 20px', borderRadius: '10px', 
                  border: 'none', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' 
                }}>
                  <Download size={16} /> Export Analysis
                </button>
              </div>

              {/* Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
                {[
                  { label: 'Total Production', value: `${totalProduction.toFixed(1)} BBL`, icon: Zap, trend: '+4.2%' },
                  { label: 'Market Average', value: `$${avgPrice.toFixed(2)}`, icon: Globe, trend: '-2.1%' },
                  { label: 'Active Holders', value: verifiedHolders, icon: Users, sub: `of ${totalHolders} total` },
                  { label: 'Portfolio Yield', value: '14.2%', icon: TrendingUp, trend: '+0.8%' }
                ].map((s, i) => (
                  <div key={i} className="premium-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ padding: '8px', background: '#f1f5f9', borderRadius: '8px' }}><s.icon size={18} /></div>
                      {s.trend && <span style={{ fontSize: '12px', fontWeight: '700', color: s.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>{s.trend}</span>}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '800' }}>{s.value}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>{s.label} {s.sub && <span>({s.sub})</span>}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="premium-card">
                  <h3 style={{ marginBottom: '24px' }}>Revenue Forecasting</h3>
                  <div style={{ height: '320px', minHeight: '320px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Mon', rev: 4000 }, { name: 'Tue', rev: 3000 }, { name: 'Wed', rev: 5000 },
                        { name: 'Thu', rev: 2780 }, { name: 'Fri', rev: 1890 }, { name: 'Sat', rev: 2390 }, { name: 'Sun', rev: 3490 }
                      ]}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="rev" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="premium-card" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
                  <h3 style={{ marginBottom: '8px' }}>Launch Distribution</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>Execute revenue sharing across verified holders.</p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '8px', display: 'block' }}>REVENUE AMOUNT (USD)</label>
                    <div style={{ position: 'relative' }}>
                      <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} color="#94a3b8" />
                      <input 
                        type="number" value={distInput} onChange={(e) => setDistInput(e.target.value)}
                        style={{ width: '100%', padding: '14px 14px 14px 36px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '16px', fontWeight: '700' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span color="#64748b">Verified Holders</span>
                      <span style={{ fontWeight: '600' }}>{verifiedHolders} / {totalHolders}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span color="#64748b">Royalties (12.5%)</span>
                      <span style={{ fontWeight: '600' }}>-${(parseFloat(distInput || 0) * 0.125).toLocaleString()}</span>
                    </div>
                    <div style={{ height: '1px', backgroundColor: '#f1f5f9', margin: '4px 0' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                      <span style={{ fontWeight: '700' }}>Net to Distribute</span>
                      <span style={{ fontWeight: '800', color: '#2563eb' }}>${(parseFloat(distInput || 0) * 0.825).toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    disabled={isDistributing}
                    onClick={handleDistribute}
                    style={{ 
                      width: '100%', marginTop: '24px', padding: '16px', borderRadius: '12px', 
                      background: '#0f172a', color: '#fff', fontWeight: '700', border: 'none',
                      opacity: isDistributing ? 0.7 : 1, transition: 'all 0.2s',
                      boxShadow: '0 10px 15px -3px rgba(15,23,42,0.2)'
                    }}>
                    {isDistributing ? 'Processing Smart Contract...' : 'Authorize Distribution'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Assets' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '28px' }}>Asset Portfolio</h2>
                <button style={{ padding: '10px 20px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '10px', border: 'none', fontWeight: '600' }}>+ Add New Well</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {state.wells.map(well => (
                  <div key={well.id} className="premium-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <Badge type={well.status === 'Active' ? 'success' : 'warning'}>{well.status}</Badge>
                      <MoreHorizontal size={18} color="#94a3b8" />
                    </div>
                    <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>{well.name}</h4>
                    <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>{well.region} Basin</p>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                        <span color="#64748b">Operational Health</span>
                        <span style={{ fontWeight: '700' }}>{well.health}%</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                        <div style={{ width: `${well.health}%`, height: '100%', backgroundColor: well.health > 80 ? '#10b981' : '#f59e0b', borderRadius: '3px' }}></div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Daily Avg</div>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{well.production} BBL</div>
                      </div>
                      <div style={{ padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                        <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Realized</div>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>${well.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Holders' && (
            <div className="animate-fade-in premium-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3>Token Holder Infrastructure</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px 16px', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}>Filters</button>
                  <button style={{ padding: '8px 16px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: '600' }}>New Holder</button>
                </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                    {['Investor', 'Equity Units', 'KYC Status', 'Total Distributed', ''].map((h, i) => (
                      <th key={i} style={{ padding: '16px 0', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {state.holders.map(holder => (
                    <tr key={holder.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ fontWeight: '700' }}>{holder.name}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>Member since {holder.joinDate}</div>
                      </td>
                      <td style={{ padding: '20px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Wallet size={14} color="#64748b" />
                          <span style={{ fontWeight: '600' }}>{holder.units.toLocaleString()} PWR</span>
                        </div>
                      </td>
                      <td style={{ padding: '20px 0' }}>
                        <Badge type={holder.verified ? 'success' : 'danger'}>{holder.verified ? 'Verified' : 'Pending'}</Badge>
                      </td>
                      <td style={{ padding: '20px 0', fontWeight: '700', color: '#0f172a' }}>
                        ${holder.totalPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '20px 0', textAlign: 'right' }}>
                        <button style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', fontSize: '13px' }}>Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Compliance' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
              <div className="premium-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Shield size={24} color="#0f172a" />
                  <h3>Rules & Gating</h3>
                </div>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Configure asset-level compliance rules and distribution gates.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'KYC Enforcement', active: true, desc: 'Block payouts to non-verified holders.' },
                    { label: 'Accredited Only', active: true, desc: 'Restrict token ownership to accredited entities.' },
                    { label: 'OFAC Sanctions', active: true, desc: 'Automated screening against global sanction lists.' },
                  ].map((rule, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: '80%' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700' }}>{rule.label}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{rule.desc}</div>
                      </div>
                      <div style={{ width: '40px', height: '20px', borderRadius: '10px', backgroundColor: rule.active ? '#0f172a' : '#cbd5e1', position: 'relative' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff', position: 'absolute', top: '2px', right: rule.active ? '2px' : 'auto', left: rule.active ? 'auto' : '2px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="premium-card">
                <h3>Verification Queue</h3>
                <div style={{ marginTop: '20px' }}>
                  {state.holders.filter(h => !h.verified).map(h => (
                    <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', border: '1px solid #ffedd5', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertCircle color="#f97316" size={20} />
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '14px' }}>{h.name}</div>
                          <div style={{ fontSize: '11px', color: '#9a3412' }}>Individual Investor • Identity pending</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => dispatch({ type: 'TOGGLE_VERIFY', payload: h.id })}
                        style={{ padding: '8px 16px', backgroundColor: '#f97316', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: '700', fontSize: '12px' }}
                      >
                        Verify Identity
                      </button>
                    </div>
                  ))}
                  {verifiedHolders === totalHolders && <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>All holders are currently verified.</div>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Audit' && (
            <div className="animate-fade-in premium-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px' }}>Immutable Audit Log</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '8px 16px', border: '1px solid #f1f5f9', borderRadius: '8px', fontSize: '12px', fontWeight: '600' }}><Download size={14} style={{ marginRight: '6px' }} /> Download Ledger</button>
                </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                    {['Event ID', 'Date', 'Type', 'Amount', 'Status', 'TX Hash'].map((h, i) => (
                      <th key={i} style={{ padding: '16px 12px', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {state.history.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '20px 12px', fontWeight: '700', color: '#2563eb' }}>{item.id}</td>
                      <td style={{ padding: '20px 12px', fontSize: '13px' }}>{item.date}</td>
                      <td style={{ padding: '20px 12px', fontSize: '13px', fontWeight: '600' }}>{item.type}</td>
                      <td style={{ padding: '20px 12px', fontWeight: '800' }}>${item.amount.toLocaleString()}</td>
                      <td style={{ padding: '20px 12px' }}><Badge type="success">{item.status}</Badge></td>
                      <td style={{ padding: '20px 12px', fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>{item.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
      
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        input:focus { outline: none; border-color: #2563eb !important; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
      `}</style>
    </div>
  );
}
