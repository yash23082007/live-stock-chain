import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-hidden relative">
      <header className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-black">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center border border-zinc-200 bg-white">
              <span className="text-black font-bold text-xs uppercase tracking-widest">LC</span>
            </div>
            <span className="text-lg font-semibold tracking-wide text-white">
              LivestockChain
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#tech" className="hover:text-white transition-colors">Technology</Link>
            <Link href="#platform" className="hover:text-white transition-colors">Platform</Link>
            <div className="h-4 w-px bg-zinc-800"></div>
            <Link href="/login" className="hover:text-white transition-colors">Log In</Link>
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-zinc-200 transition-all rounded-none px-6 shadow-none rounded-sm">
                Start Terminal
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-32 pb-24">
        <section className="flex flex-col items-center text-center py-20 lg:py-32">
          <div className="inline-flex items-center border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300 mb-8 rounded-sm">
            <span className="flex h-1.5 w-1.5 bg-white mr-2 -ml-1 animate-pulse"></span>
            System Online
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-tight">
            Traceability,<br/>
            Immutable.
          </h1>
          
          <p className="max-w-2xl text-lg lg:text-xl text-zinc-400 mb-10 leading-relaxed font-light">
            Tokenize physical livestock as cryptographic assets. Verifiable ownership, unalterable health records, and AI-driven herd analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/register">
              <Button size="lg" className="h-14 px-8 bg-white text-black font-semibold hover:bg-zinc-200 transition-transform active:scale-95 rounded-sm">
                Initialize Farm Registry
              </Button>
            </Link>
            <Link href="#docs">
              <Button size="lg" variant="outline" className="h-14 px-8 bg-black border-zinc-800 text-white hover:bg-zinc-900 font-medium transition-colors rounded-sm">
                Read Whitepaper
              </Button>
            </Link>
          </div>
        </section>

        <section id="tech" className="py-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group relative bg-black border border-zinc-800 p-8 rounded-sm overflow-hidden hover:border-zinc-500 transition-colors">
            <div className="w-10 h-10 border border-zinc-700 bg-zinc-900 flex items-center justify-center mb-6 text-white rounded-sm">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Cryptographic Proof</h3>
            <p className="text-sm font-light text-zinc-400 leading-relaxed">
              Every health event & ownership transfer is hashed (SHA-256) and anchored to a smart contract, preventing fraudulent modifications.
            </p>
          </div>

          <div className="group relative bg-black border border-zinc-800 p-8 rounded-sm overflow-hidden hover:border-zinc-500 transition-colors">
            <div className="w-10 h-10 border border-zinc-700 bg-zinc-900 flex items-center justify-center mb-6 text-white rounded-sm">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">ERC-721 Passports</h3>
            <p className="text-sm font-light text-zinc-400 leading-relaxed">
              Each animal is minted as an NFT on the Polygon network, converting physical agricultural assets into tradable, verifiable digital analogs.
            </p>
          </div>

          <div className="group relative bg-black border border-zinc-800 p-8 rounded-sm overflow-hidden hover:border-zinc-500 transition-colors">
            <div className="w-10 h-10 border border-zinc-700 bg-zinc-900 flex items-center justify-center mb-6 text-white rounded-sm">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Algorithmic Scoring</h3>
            <p className="text-sm font-light text-zinc-400 leading-relaxed">
              Real-time health grading algorithms compute dynamic risk profiles based on vaccination logs, treatment paths, and withdrawal periods.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="relative border-t border-zinc-800 bg-black py-8 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-zinc-500 font-mono">SYS_VER // {new Date().getFullYear()} — LIVESTOCK_CHAIN_PROTOCOL</p>
          <div className="flex gap-6 mt-4 md:mt-0 text-xs font-mono text-zinc-600">
            <Link href="/" className="hover:text-white transition-colors">NETWORK_STATUS</Link>
            <Link href="/" className="hover:text-white transition-colors">GITHUB_REPO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
