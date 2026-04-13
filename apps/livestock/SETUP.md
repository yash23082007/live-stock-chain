# 🚀 LivestockChain Setup Guide

## Overview

LivestockChain is a complete, production-ready livestock tracking platform built with:
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: tRPC + Prisma ORM + NextAuth.js  
- **Database**: PostgreSQL (Supabase recommended)
- **Blockchain**: Polygon + ERC-721 NFTs (optional)

This guide will get you from zero to running deployment.

## Phase 1: Fast Start (30 minutes)

### 1. Set Up Database

Sign up for [Supabase](https://supabase.com) (free tier):
1. Create new project
2. Copy connection string
3. Paste into `.env.local`:
```env
DATABASE_URL="postgresql://user:pass@db.supabase.co:5432/postgres"
```

### 2. Generate NextAuth Secret

```bash
openssl rand -base64 32
# Paste output into .env.local:
NEXTAUTH_SECRET=your-generated-secret
```

### 3. Initialize Database

```bash
npx prisma db push
```

This creates all tables from `prisma/schema.prisma`.

### 4. Start Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000` - you should see the landing page!

## Phase 2: Core Setup (1-2 hours)

### Implement Authentication

1. Complete credentials auth in `/src/lib/auth.ts`
   - Fetch user from DB
   - Hash password with bcryptjs
   - Return user object

2. Complete registration endpoint `/src/app/api/register/route.ts`
   - Validate input
   - Create user in database
   - Hash password

3. Test with:
   - Register account
   - Login
   - See dashboard

### Connect tRPC to Database

1. Create Prisma client in `/src/lib/prisma.ts`:
```typescript
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
```

2. Update routers to use Prisma, e.g., in `animals.ts`:
```typescript
import prisma from "@/lib/prisma";

create: protectedProcedure
  .input(createAnimalInput)
  .mutation(async ({ input, ctx }) => {
    const animal = await prisma.animal.create({
      data: {
        ...input,
        currentOwnerId: ctx.session.user.id,
      },
    });
    return animal;
  }),
```

### Test Animal CRUD

- Create animal (form → router → database)
- List animals
- View animal details
- Edit animal

## Phase 3: Features (3-5 hours)

### Health Event Logging

- Implement `POST /api/trpc/health.createEvent`
- Store in `health_events` table
- Calculate health score automatically
- Send alerts if needed

### Dashboard Analytics

- Count total animals, active, under withdrawal
- Build charts with Recharts
- Show recent health events
- Vaccination schedule

### Role-Based Access

Implement permission checks in routers:
```typescript
if (ctx.session.user.role === "veterinarian") {
  // Vet-only logic
}
```

## Phase 4: Polish & Deploy (2-3 hours)

### Pre-Launch Checklist

- [ ] Setup `.env.local` with all variables
- [ ] Test register → login → dashboard flow
- [ ] Test adding animal
- [ ] Test logging health event
- [ ] Test authentication (logout, session expires)
- [ ] Check Prisma migrations are stable
- [ ] Run `npm run build` successfully

### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial livestockchain setup"
git push origin main

# Connect to Vercel via dashboard
# Set environment variables in Vercel settings
# Auto-deploy on push
```

### Production Environment Variables

On Vercel dashboard, set:
- `DATABASE_URL` - Your Supabase connection string
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Generate new secret for prod
- Other API keys as needed

## Phase 5: Blockchain (Optional, 2-3 hours)

### 1. Install Blockchain Dependencies

```bash
npm install ethers wagmi @rainbow-me/rainbowkit
```

### 2. Deploy Smart Contracts

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init

# Copy contracts from spec to contracts/ folder

# Deploy to Polygon Amoy testnet
npx hardhat run scripts/deploy.js --network polygonAmoy
```

### 3. Connect Animal NFT Minting

Add to router:
```typescript
async function mintAnimalNFT(animal, farmerWallet) {
  const contract = new ethers.Contract(ADDRESS, ABI, signer);
  const tx = await contract.mintAnimal(
    farmerWallet,
    animal.id,
    animal.species,
    animal.farmId,
    timestamp,
    metadataURI
  );
  await tx.wait();
  return tx.hash;
}
```

## Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules
npm install
```

### Database connection fails

- Verify `DATABASE_URL` in `.env.local`
- Check Supabase project is active
- Test connection: `npx prisma db execute --stdin < test.sql`

### NextAuth "secret not found"

```bash
# Re-generate and add to .env.local
openssl rand -base64 32
```

### Build fails

```bash
npm run lint  # Find TypeScript errors
npm run build # Full build test
```

## Next Steps

1. **Analytics Dashboard** - Add charts showing herd trends
2. **QR Code Scanning** - Public verification page
3. **Breeding Management** - Track offspring and lineage
4. **Health Alerts** - Automatic email notifications
5. **Mobile App** - React Native version
6. **AI Features** - Health predictions, outbreak detection

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [tRPC](https://trpc.io)
- [Prisma](https://www.prisma.io)
- [Supabase](https://supabase.com/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Polygon Docs](https://polygon.technology/developers)

## Support

- Check GitHub Issues
- Read spec documentation
- Email support@livestockchain.app

---

**Ready to run?** → `npm run dev`
