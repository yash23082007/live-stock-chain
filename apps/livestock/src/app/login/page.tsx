"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Fingerprint, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Verification failed. Please check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-brand-surface font-sans selection:bg-brand-primary selection:text-white selection:bg-opacity-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-3xl -ml-64 -mb-64" />

      <div className="w-full max-w-[440px] relative z-10">
        <div className="mb-12 flex flex-col items-center">
           <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-xl shadow-brand-primary/20 transform rotate-3">
                <span className="text-white font-black text-sm tracking-tighter">LC</span>
              </div>
              <span className="text-3xl font-display font-black tracking-tighter text-brand-primary">
                LivestockChain
              </span>
           </Link>
        </div>

        <Card className="w-full border-brand-primary/5 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary" />
          <CardHeader className="space-y-2 pb-6 px-10 pt-10 text-center">
            <CardTitle className="text-3xl font-display font-black text-brand-primary tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-brand-primary/60 font-medium">Access your global agricultural registry node.</CardDescription>
          </CardHeader>
          
          <CardContent className="px-10 pb-10 pt-4">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-brand-primary/40 ml-1">Identity / Email</Label>
                <div className="relative group">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20 group-focus-within:text-brand-primary transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="node-operator@livestock.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-2xl border-brand-primary/5 bg-white pl-12 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary/20 transition-all h-14 font-medium"
                      disabled={isLoading}
                    />
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-brand-primary/40">Credential Key</Label>
                  <a href="#" className="text-xs font-bold text-brand-primary/60 hover:text-brand-primary transition-colors tracking-tight">Forgot Key?</a>
                </div>
                <div className="relative group">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20 group-focus-within:text-brand-primary transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      placeholder="••••••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="rounded-2xl border-brand-primary/5 bg-white pl-12 focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary/20 transition-all h-14 tracking-[0.3em] font-black"
                      disabled={isLoading}
                    />
                </div>
              </div>
              
              <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-2xl bg-brand-primary text-white hover:bg-brand-primary/90 font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98] group">
                {isLoading ? "Verifying..." : (
                  <>
                    Sign In to Node
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-10 text-center">
           <p className="text-sm font-medium text-brand-primary/40">
            Node status: <span className="text-brand-success font-bold">Encrypted</span>
           </p>
           <p className="mt-4 text-sm font-bold text-brand-primary/60">
            New operator?{" "}
            <Link href="/register" className="text-brand-primary hover:text-brand-accent transition-all underline underline-offset-4 decoration-brand-accent/30 decoration-2">
              Create Node Profile
            </Link>
           </p>
        </div>
      </div>
    </div>
  );
}
