"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      alert("Login failed. Provide test credentials or correct password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-black font-sans selection:bg-white selection:text-black px-4 relative overflow-hidden">
      <div className="w-full max-w-[420px] mb-8 relative z-10">
        <div className="mb-8 flex justify-center">
           <Link href="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 border border-white bg-white items-center justify-center flex">
                <span className="text-black font-bold text-sm tracking-widest uppercase">LC</span>
              </div>
              <span className="text-2xl font-semibold tracking-wide text-white">
                LivestockChain
              </span>
           </Link>
        </div>

        <Card className="w-full border border-zinc-800 bg-black rounded-none shadow-none">
          <CardHeader className="space-y-2 pb-6 px-8 pt-8 text-center border-b border-zinc-800">
            <CardTitle className="text-2xl font-medium tracking-tight text-white">System Login</CardTitle>
            <CardDescription className="text-sm text-zinc-500 font-light">Access your encrypted agricultural registry.</CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 pt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-zinc-400">Wallet / Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@livestock.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-none border-zinc-800 bg-black text-white placeholder-zinc-700 focus:border-white focus:ring-0 transition-all h-12 font-mono text-sm"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-mono uppercase tracking-widest text-zinc-400">Passkey</Label>
                  <a href="#" className="text-xs font-medium text-zinc-500 hover:text-white transition-colors tracking-tight">Recover</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="••••••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-none border-zinc-800 bg-black text-white focus:border-white focus:ring-0 transition-all h-12 tracking-widest"
                  disabled={isLoading}
                />
              </div>
              
              <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-none bg-white text-black hover:bg-zinc-200 font-semibold tracking-wide transition-all mt-6 active:scale-[0.98]">
                {isLoading ? "AUTHENTICATING..." : "INITIATE SESSION"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs font-mono text-zinc-500">
          UNREGISTERED?{" "}
          <Link href="/register" className="text-white hover:text-zinc-300 transition-colors underline underline-offset-4">
            CREATE ACCOUNT
          </Link>
        </p>
      </div>
    </div>
  );
}
