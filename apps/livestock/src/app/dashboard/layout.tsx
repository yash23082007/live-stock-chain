"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import {
  LogOut,
  Menu,
  X,
  Home,
  Users,
  Heart,
  Settings,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const navigationItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Animals", href: "/dashboard/animals" },
    { icon: Heart, label: "Health", href: "/dashboard/health" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen bg-[#FAFAFA] font-sans selection:bg-emerald-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white/60 backdrop-blur-xl border-r border-gray-200/60 transition-all duration-300 flex flex-col shadow-sm relative z-20`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200/50 justify-between">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[10px] flex items-center justify-center shadow-sm shadow-emerald-500/20">
                <span className="text-white font-bold text-xs tracking-wider">LC</span>
              </div>
              <span className="font-semibold text-gray-900 tracking-tight">Livestock<span className="text-emerald-600">Chain</span></span>
            </div>
          ) : (
             <div className="w-8 h-8 mx-auto bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-[10px] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs tracking-wider">LC</span>
             </div>
          )}
        </div>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 text-gray-400 hover:text-emerald-600 shadow-sm z-30 transition-colors">
          {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
        </button>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50 font-medium text-sm transition-all group">
              <item.icon size={18} className="group-hover:scale-110 transition-transform text-gray-400 group-hover:text-emerald-600" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200/50 mx-2 mb-2 rounded-2xl bg-gray-50/50">
          <div className="flex items-center gap-3 mb-3 px-2">
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">{session?.user?.role || "farmer"}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
            <LogOut size={16} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Subtle background blob for the dashboard main area */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl opacity-50 mix-blend-multiply rounded-bl-full pointer-events-none"></div>

        {/* Top Bar */}
        <header className="h-16 bg-white/40 backdrop-blur-md border-b border-gray-200/50 px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Overview</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-emerald-600 hover:bg-white rounded-full transition-colors shadow-sm bg-gray-50 border border-gray-100">
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-emerald-100 border border-gray-200"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
