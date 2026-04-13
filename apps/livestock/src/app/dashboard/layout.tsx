"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  PawPrint,
  HeartPulse,
  Settings,
  BarChart3,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-surface">
        <div className="relative flex flex-col items-center gap-4">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
           <span className="text-brand-primary/40 text-xs font-bold tracking-widest uppercase">Initializing Protocol</span>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const navigationItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: PawPrint, label: "Herd Tracking", href: "/dashboard/animals" },
    { icon: HeartPulse, label: "Health Logs", href: "/dashboard/health" },
    { icon: BarChart3, label: "Market Intel", href: "/dashboard/analytics" },
    { icon: Settings, label: "Config", href: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-brand-surface font-sans selection:bg-brand-primary selection:text-white selection:bg-opacity-10 overflow-hidden">
      {/* Premium Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-24"
        } bg-brand-primary text-white transition-all duration-500 ease-in-out flex flex-col relative z-20 shadow-2xl`}>
        
        {/* Sidebar Header */}
        <div className="h-24 flex items-center px-8 justify-between border-b border-white/5">
          <div className={`flex items-center gap-4 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 invisible w-0"}`}>
            <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-black/20 transform rotate-3">
              <span className="text-brand-primary font-black text-sm">LC</span>
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Livestock<span className="text-brand-accent">Chain</span></span>
          </div>
          {!sidebarOpen && (
             <div className="w-10 h-10 mx-auto bg-brand-accent rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <span className="text-brand-primary font-black text-sm">LC</span>
             </div>
          )}
        </div>

        {/* Sidebar Collapse Toggle */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="absolute -right-4 top-28 w-8 h-8 bg-brand-accent text-brand-primary rounded-full flex items-center justify-center shadow-xl z-30 hover:scale-110 transition-transform">
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-10 space-y-2 overflow-y-auto custom-scrollbar">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300">
              <item.icon size={22} className="group-hover:scale-110 transition-transform group-hover:text-brand-accent" />
              {sidebarOpen && <span className="font-medium tracking-tight whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile Hook */}
        <div className="p-6 bg-white/5 mx-4 mb-8 rounded-[2rem] border border-white/5">
          {sidebarOpen && (
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent flex items-center justify-center text-brand-primary font-bold shadow-inner">
                {session?.user?.name?.[0] || "U"}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-display font-bold text-white truncate leading-none mb-1">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-brand-accent font-bold uppercase tracking-widest opacity-80">{session?.user?.role || "Protocol Head"}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold rounded-xl transition-all ${
              sidebarOpen 
                ? "bg-white/10 hover:bg-brand-danger text-white border border-white/5" 
                : "text-white/40 hover:text-white"
            }`}>
            <LogOut size={18} />
            {sidebarOpen && <span>Secure Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />

        {/* Global Dashboard Header */}
        <header className="h-24 bg-brand-surface/80 backdrop-blur-xl border-b border-brand-primary/5 px-10 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-6 flex-1 max-w-xl">
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20 group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Query network / assets..." 
                  className="w-full h-12 bg-white border border-brand-primary/5 rounded-2xl pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative w-12 h-12 glass border-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary/60 hover:text-brand-primary hover:scale-105 transition-all">
              <span className="absolute top-3 right-3 w-2 h-2 bg-brand-danger rounded-full ring-4 ring-brand-surface"></span>
              <Bell size={20} />
            </button>
            <div className="h-10 w-px bg-brand-primary/10 mx-2" />
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-brand-primary/40 uppercase tracking-tighter">Network Node</p>
                  <p className="text-sm font-black text-brand-primary">LCP-001</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center border-4 border-white shadow-2xl">
                  <div className="w-2 h-2 bg-brand-success rounded-full animate-pulse" />
               </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Surface */}
        <div className="flex-1 overflow-auto custom-scrollbar p-10">
          {children}
        </div>
      </main>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(26, 60, 52, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(26, 60, 52, 0.2);
        }
      `}</style>
    </div>
  );
}
