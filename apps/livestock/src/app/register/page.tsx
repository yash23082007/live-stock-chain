"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User, Mail, Lock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Credentials do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Registration failed");
      } else {
        router.push("/login?success=registered");
      }
    } catch (err) {
      setError("A synchronization error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center px-4 relative overflow-hidden font-sans selection:bg-brand-primary selection:text-white selection:bg-opacity-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl -ml-64 -mt-64" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl -mr-64 -mb-64" />

      <div className="w-full max-w-[480px] relative z-10 py-12">
        <div className="mb-10 flex flex-col items-center">
           <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-xl shadow-brand-primary/20 transform -rotate-3">
                <span className="text-white font-black text-xs">LC</span>
              </div>
              <span className="text-2xl font-display font-black tracking-tighter text-brand-primary">
                LivestockChain
              </span>
           </Link>
        </div>

        <Card className="w-full border-brand-primary/5 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-brand-accent via-brand-primary to-brand-accent" />
          <CardHeader className="space-y-2 pb-6 px-10 pt-10 text-center">
            <CardTitle className="text-3xl font-display font-black text-brand-primary tracking-tight">Create Node Profile</CardTitle>
            <CardDescription className="text-brand-primary/60 font-medium font-display">Begin your journey in the local-first agricultural network.</CardDescription>
          </CardHeader>

          <CardContent className="px-10 pb-10 pt-4">
            {error && (
              <div className="mb-6 p-4 bg-brand-danger/10 border border-brand-danger/20 rounded-2xl text-sm font-bold text-brand-danger animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-brand-primary/40 ml-1">Full Identity Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20" />
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-2xl border-brand-primary/5 bg-white pl-12 h-14 font-medium focus:ring-4 focus:ring-brand-primary/5"
                    placeholder="John Doe Farmer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-brand-primary/40 ml-1">Email Node</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="rounded-2xl border-brand-primary/5 bg-white pl-12 h-14 font-medium focus:ring-4 focus:ring-brand-primary/5 px-4"
                      placeholder="node@lcp.org"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-brand-primary/40 ml-1">Assigned Role</Label>
                  <div className="relative">
                     <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20 pointer-events-none" />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full h-14 bg-white border border-brand-primary/5 rounded-2xl pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-primary/5 transition-all appearance-none">
                        <option value="farmer">Farmer Node</option>
                        <option value="veterinarian">Vet Expert</option>
                        <option value="buyer">Market Agent</option>
                      </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-brand-primary/40 ml-1">Access Passkey</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20" />
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-2xl border-brand-primary/5 bg-white pl-12 h-14 font-black tracking-widest focus:ring-4 focus:ring-brand-primary/5"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-brand-primary/40 ml-1">Confirm Passkey</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary/20" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="rounded-2xl border-brand-primary/5 bg-white pl-12 h-14 font-black tracking-widest focus:ring-4 focus:ring-brand-primary/5"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-primary text-white font-black h-16 rounded-2xl hover:bg-brand-primary/90 disabled:opacity-50 transition-all shadow-xl shadow-brand-primary/20 text-lg group">
                {isLoading ? "Synchronizing..." : (
                  <>
                    Initialize Account
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-brand-primary/5">
              <p className="text-center text-brand-primary/40 text-sm font-bold">
                Already established?{" "}
                <Link href="/login" className="text-brand-primary hover:text-brand-accent transition-all underline underline-offset-4 decoration-brand-accent/30 decoration-2">
                  Enter Node
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
