# 🐄 LivestockChain

> Blockchain-anchored livestock management & traceability platform for Indian farmers.
> Built with Next.js 14, tRPC, Prisma, Polygon blockchain — supporting 11 Indian languages.

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://your-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)
[![Polygon](https://img.shields.io/badge/Blockchain-Polygon-purple)](https://polygon.technology)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 Key Features
- **Public Provenance via QR**: Buyers scan an ear-tag QR code to verify full blockchain history on a mobile-friendly page.
- **Multilingual UI & Voice Input**: Designed for rural accessibility; translates into 11 regional languages (`next-intl`) and uses browser Web Speech APIs to dictation in Hindi/Telugu/Tamil without typing.
- **Smart Alerts**: Automated email (Resend) and Push vaccination/withdrawal-period alerts.
- **Hybrid Smart Contract Approach**: Polygon Amoy handles immutable anchor references via `keccak256` hashing and native `IPFS/Pinata` CIDs for cost effectiveness.

## 📱 Screenshots
*(Placeholders for 3–4 GIFs: dashboard, QR scan, blockchain trace, Hindi UI)*
![LivestockChain QR Provenance](https://placehold.co/800x400?text=LivestockChain+App+Screenshots)

## 📊 Market Opportunity
The global livestock blockchain traceability market was valued at **$217.4M in 2024** and is projected to reach **$2.74B by 2033 (CAGR: 33.8%)**.
India natively holds 178 million cattle — the world's largest cattle population. Additionally, sweeping regulations like the upcoming **EU Digital Product Passport (2027)** enforces blockchain-verified lifecycle metadata on global agricultural imports.

## 🏗️ Architecture
`Next.js (App Router)` → `tRPC` → `Prisma` → `PostgreSQL` + `Polygon & IPFS Pinata`

*(Add diagram snapshot here)*

## 🛠️ Tech Stack
| Category | Technology | Usage Focus |
|---|---|---|
| **Frontend** | Next.js 14, Tailwind, React | UI, SSR, API routes |
| **Backend** | tRPC, Prisma, NextAuth | Fully-typed endpoints, Session Auth, queries |
| **Database** | PostgreSQL, Upstash Redis | Local/Supabase relational core, limits |
| **Web3** | Ethers.js, Solidity, Polygon, Pinata | On-chain anchors, event hooks, IPFS metadata |

## 🚀 Getting Started

### Phase 1: Fast Start (30 minutes)

**1. Set up your Database (Supabase or Docker)**
```env
DATABASE_URL="postgresql://user:pass@db.supabase.co:5432/postgres"
```

**2. Generate Keys**
```bash
openssl rand -base64 32 # Apply to NEXTAUTH_SECRET

# Optionally set Blockchains
POLYGON_RPC_URL="https://rpc-amoy.polygon.technology/"
PRIVATE_KEY="your-deployer-private-key"
```

**3. Initialize Database & Run**
```bash
npx prisma db push
npm install
npm run dev
```

## 🌍 Supported Languages
| Code | Language | Native |
|---|---|---|
| `en` | English  | English |
| `hi` | Hindi    | हिंदी |
| `te` | Telugu   | తెలుగు |
| `ta` | Tamil    | தமிழ் |
| `bn` | Bengali  | বাংলা |
| `mr` | Marathi  | मराठी |
| `pa` | Punjabi  | ਪੰਜਾਬੀ |
| `gu` | Gujarati | ગુજરાતી |

## 🤝 Contributing
Open to PRs. Look over our `ci.yml` linting thresholds before deploying! 

