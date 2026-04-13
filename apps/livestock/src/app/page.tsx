"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Activity, Fingerprint, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-surface text-foreground font-sans selection:bg-brand-primary selection:text-white selection:bg-opacity-20 overflow-x-hidden">
      {/* Immersive Header */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300 glass border-b-white/10">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-primary rounded-xl shadow-lg shadow-brand-primary/20 transform group-hover:rotate-12 transition-transform">
              <span className="text-white font-bold text-sm tracking-tighter">LC</span>
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-brand-primary">
              LivestockChain
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-brand-primary/70">
            <Link href="#tech" className="hover:text-brand-primary transition-colors hover:translate-y-[-1px]">Technology</Link>
            <Link href="#platform" className="hover:text-brand-primary transition-colors hover:translate-y-[-1px]">Platform</Link>
            <div className="h-6 w-px bg-brand-primary/10"></div>
            <Link href="/login" className="hover:text-brand-primary transition-colors">Log In</Link>
            <Link href="/register">
              <Button className="bg-brand-primary text-white hover:bg-brand-primary/90 rounded-full px-8 shadow-md hover:shadow-xl transition-all active:scale-95">
                Join the Network
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Immersive Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-105 animate-pulse-slow">
             <Image 
               src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=2674&auto=format&fit=crop" 
               alt="Premium Organic Farm"
               fill
               className="object-cover opacity-90"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-r from-brand-surface/90 via-brand-surface/40 to-transparent" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center glass px-4 py-2 rounded-full text-xs font-semibold text-brand-primary mb-8 border-brand-primary/10">
                <span className="flex h-2 w-2 bg-brand-success mr-2 rounded-full animate-ping"></span>
                v2.0 Livestock OS Live
              </div>
              
              <h1 className="text-6xl lg:text-8xl font-display font-black tracking-tighter text-brand-primary mb-8 leading-[0.9] text-balance">
                Traceability. <br/>
                <span className="text-brand-accent italic">Redefined.</span>
              </h1>
              
              <p className="max-w-xl text-lg lg:text-xl text-brand-primary/70 mb-12 leading-relaxed font-normal">
                Convert physical biological assets into untamperable digital records. 
                Experience the world's most sophisticated livestock management protocol.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Link href="/register">
                  <Button size="lg" className="h-16 px-10 bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 transition-all rounded-2xl shadow-2xl shadow-brand-primary/20 group">
                    Initialize Farm Registry
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="#docs">
                  <Button size="lg" variant="ghost" className="h-16 px-10 text-brand-primary font-bold hover:bg-brand-primary/5 transition-colors rounded-2xl">
                    View Network Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Tech Section */}
        <section id="tech" className="py-32 bg-white relative overflow-hidden">
          <div className="hero-gradient absolute inset-0 opacity-50" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-brand-primary/60 text-sm font-bold tracking-widest uppercase mb-4">Core Technology</h2>
              <p className="text-4xl font-display font-bold text-brand-primary tracking-tight">Built on the foundation of trust and transparency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Cryptographic Passports",
                  desc: "Every animal is minted as a unique ERC-721 token, containing its entire genetic and health lineage.",
                  icon: <Fingerprint className="w-8 h-8" />,
                  color: "bg-emerald-50 text-emerald-700"
                },
                {
                  title: "Real-time Biometrics",
                  desc: "Integrate directly with IoT biosensors to track health scores, movement patterns, and stress levels.",
                  icon: <Activity className="w-8 h-8" />,
                  color: "bg-blue-50 text-blue-700"
                },
                {
                  title: "Global Supply Audit",
                  desc: "Complete 100% verifiable chain-of-custody, from birth to point-of-sale, accessible via any smartphone.",
                  icon: <Globe className="w-8 h-8" />,
                  color: "bg-brand-secondary/10 text-brand-secondary"
                }
              ].map((feature, idx) => (
                <div key={idx} className="group p-10 bg-brand-surface/30 border border-brand-primary/5 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 transition-all duration-500">
                  <div className={`w-16 h-16 ${feature.color} flex items-center justify-center mb-8 rounded-2xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brand-primary mb-4">{feature.title}</h3>
                  <p className="text-brand-primary/60 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section id="platform" className="py-32 bg-brand-primary text-white rounded-[4rem] mx-6 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center bg-white/10 px-4 py-2 rounded-full text-xs font-bold text-brand-accent mb-8 border border-white/10">
                PRO PLATFORM
              </div>
              <h2 className="text-5xl lg:text-7xl font-display font-black tracking-tight mb-8 leading-none">
                Command center for the <span className="text-brand-accent underline underline-offset-8">modern</span> rancher.
              </h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed font-light">
                Our intuitive dashboard gives you high-fidelity insights into herd performance, 
                upcoming vaccinations, and market valuations in real-time.
              </p>
              <div className="space-y-6">
                {[
                  "Automated Health Alerts",
                  "One-click NFT Minting",
                  "Secure Ownership Transfers",
                  "Advanced Revenue Analytics"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
                      <Shield className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
                    </div>
                    <span className="font-semibold text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-accent opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />
              <div className="relative glass-dark p-2 rounded-[2rem] border-white/20 shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-700 overflow-hidden">
                 <div className="bg-brand-surface h-[500px] w-full rounded-[1.5rem] flex items-center justify-center border border-white/10">
                    <div className="text-brand-primary/20 flex flex-col items-center">
                       <Activity className="w-20 h-20 mb-4 animate-pulse" />
                       <span className="font-bold tracking-widest text-xs uppercase">Dashboard Interactive Preview</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-brand-surface py-20 border-t border-brand-primary/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">LC</div>
              <span className="font-display font-bold text-lg text-brand-primary">LivestockChain</span>
            </div>
            <p className="text-sm text-brand-primary/40 font-medium">
              &copy; {new Date().getFullYear()} LivestockChain Protocol. All agricultural rights reserved.
            </p>
            <div className="flex gap-10 text-xs font-bold text-brand-primary/60 tracking-widest uppercase">
              <Link href="/" className="hover:text-brand-primary transition-colors">Safety</Link>
              <Link href="/" className="hover:text-brand-primary transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-brand-primary transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
