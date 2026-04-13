import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LivestockChain - Blockchain Livestock Tracking",
  description:
    "Advanced, blockchain-anchored livestock management platform for farmers, veterinarians, and regulators.",
  keywords: [
    "livestock",
    "blockchain",
    "agriculture",
    "farm management",
    "cattle tracking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-black text-white selection:bg-white selection:text-black min-h-screen`}>
        <AuthProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
