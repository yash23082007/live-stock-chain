import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <span className="font-semibold text-lg text-gray-900">LivestockChain</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About LivestockChain</h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is LivestockChain?</h2>
            <p>
              LivestockChain is an advanced, blockchain-anchored livestock management platform that
              digitizes the entire lifecycle of farm animals—from birth to slaughter or sale. It creates
              an immutable, tamper-proof record of every animal's identity, health events, ownership
              transfers, vaccinations, treatments, breeding records, and provenance chain.
            </p>
            <p>
              Unlike traditional paper logs or siloed farm software, LivestockChain uses Web3 smart
              contracts to anchor critical records on-chain (Polygon Mumbai testnet / mainnet) while
              keeping bulk operational data on a high-performance off-chain backend. This gives farmers,
              veterinarians, buyers, regulators, and food supply chain actors a single source of truth
              they can cryptographically verify.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Problems Solved</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Fraud Prevention</strong> — Ownership and health records cannot be falsified once
                on-chain
              </li>
              <li>
                <strong>Traceability</strong> — Every animal can be traced from farm of birth to point of
                sale
              </li>
              <li>
                <strong>Regulatory Compliance</strong> — Automatic audit trail for government livestock
                regulators
              </li>
              <li>
                <strong>Disease Management</strong> — Instant alerts and cluster analysis for outbreak
                containment
              </li>
              <li>
                <strong>Market Trust</strong> — Buyers can scan a QR code and see the full verified
                history of any animal
              </li>
              <li>
                <strong>Insurance & Finance</strong> — Verifiable records unlock better loan and
                insurance terms for farmers
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Animal registration with photos and unique identifiers</li>
              <li>Health event tracking (vaccinations, treatments, illnesses)</li>
              <li>Ownership transfer and traceability</li>
              <li>Breeding and lineage tracking</li>
              <li>Blockchain-verified NFT animal identity</li>
              <li>QR code scanning for public verification</li>
              <li>Health scoring and outbreak detection</li>
              <li>Role-based access control</li>
              <li>100% free to use</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p>Built entirely on free, open-source tools:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Frontend: Next.js 14, TypeScript, Tailwind CSS</li>
              <li>Backend: Next.js API Routes, tRPC, Prisma ORM</li>
              <li>Database: Supabase PostgreSQL</li>
              <li>Blockchain: Polygon (EVM-compatible)</li>
              <li>IPFS: Web3.Storage decentralized storage</li>
              <li>Authentication: NextAuth.js</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Farmers</h2>
            <p>
              Digitize your herd records, track animal health, manage breeding, and unlock better
              financing terms with verifiable on-chain records. No more paper logs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Veterinarians</h2>
            <p>
              Record vaccinations, treatments, and health certifications with one click. Access patient
              history across farms. Participate in outbreak containment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Buyers & Regulators</h2>
            <p>
              Scan a QR code to verify the complete history of any animal. Know exactly what treatments
              it received, when it was vaccinated, and which farm raised it. Verify on the blockchain.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg font-semibold text-emerald-600">
              To make every livestock animal in the world traceable, verifiable, and protected—from farm
              to fork.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-emerald-50 rounded-xl border border-emerald-200">
          <h3 className="text-lg font-bold text-emerald-900 mb-4">Ready to Get Started?</h3>
          <p className="text-emerald-800 mb-6">
            Start tracking your livestock today. Free forever on the free tier.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
