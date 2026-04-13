"use client";

import { trpc } from "@/components/providers/TRPCProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Plus, 
  Download, 
  Heart, 
  ShieldCheck, 
  Activity, 
  BadgeCheck,
  ChevronRight,
  ClipboardList
} from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const dashboardQuery = trpc.farms.getDashboard.useQuery();

  if (dashboardQuery.isLoading) {
    return (
      <div className="max-w-7xl mx-auto w-full space-y-10 animate-pulse">
        <div className="flex justify-between items-end border-b border-brand-primary/5 pb-8">
           <div className="space-y-4">
              <div className="h-4 w-24 bg-brand-primary/10 rounded-full"></div>
              <div className="h-10 w-64 bg-brand-primary/10 rounded-xl"></div>
           </div>
           <div className="flex gap-4">
              <div className="h-12 w-32 bg-brand-primary/10 rounded-2xl"></div>
              <div className="h-12 w-32 bg-brand-primary/10 rounded-2xl"></div>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4].map(i => <div key={i} className="h-44 bg-white border border-brand-primary/5 rounded-[2.5rem] shadow-sm"></div>)}
        </div>
      </div>
    );
  }

  const farm = dashboardQuery.data;

  if (!farm) {
    return (
      <div className="max-w-4xl mx-auto w-full pt-20">
        <div className="glass p-16 rounded-[3rem] text-center border-brand-primary/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-accent to-brand-primary" />
          <div className="relative z-10">
            <h1 className="text-5xl font-display font-black text-brand-primary mb-6">Initialize Your Node</h1>
            <p className="text-xl text-brand-primary/60 mb-10 max-w-lg mx-auto leading-relaxed">
              Your farm's digital twin hasn't been anchored to the network yet. 
              Let's begin the registration process.
            </p>
            <Button size="lg" className="bg-brand-primary text-white hover:bg-brand-primary/90 h-16 px-10 rounded-2xl shadow-xl shadow-brand-primary/20 text-lg font-bold">
              Register Your Farm →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full space-y-12">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-brand-primary/5 pb-10">
        <div className="space-y-2">
          <p className="text-xs font-bold text-brand-primary/40 uppercase tracking-[0.2em]">Platform // Overview</p>
          <h1 className="text-4xl lg:text-5xl font-display font-black text-brand-primary tracking-tight">{farm.name} <span className="text-brand-accent">OS</span></h1>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" size="lg" className="flex-1 md:flex-none h-14 bg-white border-brand-primary/10 rounded-2xl shadow-sm hover:bg-brand-surface font-bold text-brand-primary">
            <Download className="mr-2 w-4 h-4" /> Export Ledger
          </Button>
          <Button size="lg" className="flex-1 md:flex-none h-14 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-2xl shadow-xl shadow-brand-primary/20 font-bold px-8">
            <Plus className="mr-2 w-5 h-5" /> Add Animal
          </Button>
        </div>
      </div>

      {/* Modern Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Total Livestock",
            value: farm.animals?.length || 0,
            sub: "Active on Farm",
            icon: <Activity className="w-6 h-6 text-brand-success" />,
            color: "brand-success",
            trend: "+2% this week"
          },
          {
            title: "Cr. Health Score",
            value: "92",
            sub: "Nodes Verified",
            icon: <Heart className="w-6 h-6 text-red-500" />,
            color: "red-500",
            trend: "Stable"
          },
          {
            title: "Active Passports",
            value: "0",
            sub: "Polygon Network",
            icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />,
            color: "brand-primary",
            trend: "Pending Mint"
          },
          {
            title: "System Integrity",
            value: "100%",
            sub: "Sync Status",
            icon: <BadgeCheck className="w-6 h-6 text-brand-accent" />,
            color: "brand-accent",
            trend: "Optimal"
          }
        ].map((metric, i) => (
          <Card key={i} className="group relative border-none bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 p-8 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
                {metric.icon}
            </div>
            <div className={`w-12 h-12 rounded-2xl border border-brand-primary/5 flex items-center justify-center mb-6 bg-brand-surface group-hover:bg-brand-primary group-hover:text-white transition-colors`}>
               {metric.icon}
            </div>
            <div className="space-y-4">
              <CardTitle className="text-xs font-bold text-brand-primary/40 uppercase tracking-widest">{metric.title}</CardTitle>
              <div className="flex items-baseline gap-2">
                <div className="text-4xl font-display font-black text-brand-primary tracking-tighter">{metric.value}</div>
                <span className="text-xs font-bold text-brand-primary/40 leading-none">{metric.trend}</span>
              </div>
              <p className="text-xs font-bold text-brand-primary/30 uppercase tracking-tighter">{metric.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-xl font-display font-black text-brand-primary flex items-center gap-3">
              <ClipboardList className="w-6 h-6 text-brand-accent" />
              Recent Network Events
            </h3>
            <Button variant="ghost" className="text-brand-primary h-10 px-4 font-bold rounded-xl space-x-2">
              <span>Full Audit</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-white rounded-[3rem] border border-brand-primary/5 shadow-sm p-2 overflow-hidden min-h-[400px] flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-brand-surface/30 opacity-50" />
            <div className="relative z-10 text-center space-y-6 max-w-sm">
                <div className="w-24 h-24 bg-brand-surface rounded-[2rem] mx-auto flex items-center justify-center border border-brand-primary/5">
                   <Activity className="w-10 h-10 text-brand-primary/10" />
                </div>
                <div className="space-y-2">
                   <p className="text-lg font-bold text-brand-primary">No Activity Detected</p>
                   <p className="text-sm text-brand-primary/40 font-medium">Your network node is currently in idle standby. Start by recording your first animal event.</p>
                </div>
                <Button variant="outline" className="border-brand-primary/10 rounded-xl h-12 px-6 font-bold text-brand-primary hover:bg-brand-surface">
                   Create Initialization Log
                </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="px-4">
            <h3 className="text-xl font-display font-black text-brand-primary flex items-center gap-3">
              <BadgeCheck className="w-6 h-6 text-brand-primary" />
              Protocol Checklist
            </h3>
          </div>
          <div className="bg-brand-primary text-white rounded-[3rem] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mb-10 -mr-10 group-hover:scale-150 transition-transform" />
            
            {[
              { label: "Register Core Assets", status: "complete", sub: "Farm details anchored" },
              { label: "Add First Herd Segment", status: "pending", sub: "Cattle or Sheep registry" },
              { label: "Verify IoT Nodes", status: "locked", sub: "Connect biosensors" },
              { label: "Mint NFT Passports", status: "locked", sub: "Wallet connection required" }
            ].map((task, idx) => (
              <div key={idx} className="flex gap-6 items-start relative z-10">
                <div className={`mt-1.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                  task.status === 'complete' ? 'bg-brand-accent border-brand-accent text-brand-primary' : 
                  task.status === 'pending' ? 'bg-white/10 border-white/20 text-white' : 
                  'bg-white/5 border-white/5 text-white/20'
                }`}>
                  {task.status === 'complete' ? <BadgeCheck className="w-4 h-4" /> : <Plus className="w-3 h-3" />}
                </div>
                <div className="space-y-1">
                  <p className={`font-bold text-lg leading-none ${task.status === 'locked' ? 'opacity-30' : 'opacity-100'}`}>{task.label}</p>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{task.sub}</p>
                </div>
              </div>
            ))}

            <div className="pt-6 relative z-10">
               <Button className="w-full h-16 bg-brand-accent text-brand-primary font-black text-lg rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/10">
                  Execute Next Task
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
