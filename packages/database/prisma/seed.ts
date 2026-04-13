import bcrypt from "bcryptjs";
import { PrismaClient, UserRole, InputCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPasswordHash = await bcrypt.hash("AdminPass123", 12);
  const farmerPasswordHash = await bcrypt.hash("FarmerPass123", 12);
  const supplierPasswordHash = await bcrypt.hash("SupplierPass123", 12);

  const adminUser = await prisma.user.upsert({
    where: { phone: "+15550000001" },
    update: {},
    create: {
      phone: "+15550000001",
      email: "admin@farmfinance.local",
      passwordHash: adminPasswordHash,
      role: UserRole.ADMIN,
    },
  });

  const farmerUser = await prisma.user.upsert({
    where: { phone: "+15550000002" },
    update: {},
    create: {
      phone: "+15550000002",
      email: "farmer@farmfinance.local",
      passwordHash: farmerPasswordHash,
      role: UserRole.FARMER,
    },
  });

  const supplierUser = await prisma.user.upsert({
    where: { phone: "+15550000003" },
    update: {},
    create: {
      phone: "+15550000003",
      email: "supplier@farmfinance.local",
      passwordHash: supplierPasswordHash,
      role: UserRole.SUPPLIER,
    },
  });

  await prisma.farmer.upsert({
    where: { userId: farmerUser.id },
    update: {},
    create: {
      userId: farmerUser.id,
      firstName: "Amina",
      lastName: "Njeri",
      district: "Nakuru",
      region: "Rift Valley",
      primaryCrop: "Maize",
      cropsSown: ["Maize", "Beans"],
      farmSizeAcres: 3.5,
      creditLimit: 15000,
      creditScore: 620,
    },
  });

  const supplier = await prisma.supplier.upsert({
    where: { userId: supplierUser.id },
    update: {},
    create: {
      userId: supplierUser.id,
      companyName: "Green Harvest Inputs",
      licenseNo: "LIC-2026-001",
      isVerified: true,
    },
  });

  const season = await prisma.season.upsert({
    where: { name: "2026 Main Season" },
    update: {
      isActive: true,
    },
    create: {
      name: "2026 Main Season",
      startDate: new Date("2026-03-01T00:00:00.000Z"),
      endDate: new Date("2026-11-30T00:00:00.000Z"),
      isActive: true,
    },
  });

  const products = [
    {
      sku: "SEED-MAIZE-25KG",
      name: "Hybrid Maize Seed 25kg",
      category: InputCategory.SEEDS,
      unit: "25kg bag",
      pricePerUnit: 4200,
      stockQty: 200,
    },
    {
      sku: "FERT-NPK-50KG",
      name: "NPK Fertilizer 50kg",
      category: InputCategory.FERTILIZER,
      unit: "50kg bag",
      pricePerUnit: 6100,
      stockQty: 300,
    },
    {
      sku: "PEST-LEAF-1L",
      name: "Leaf Guard Pesticide 1L",
      category: InputCategory.PESTICIDE,
      unit: "1 litre bottle",
      pricePerUnit: 1350,
      stockQty: 120,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        category: product.category,
        unit: product.unit,
        pricePerUnit: product.pricePerUnit,
        stockQty: product.stockQty,
        supplierId: supplier.id,
      },
      create: {
        supplierId: supplier.id,
        ...product,
      },
    });
  }

  console.log("Seed complete", {
    adminUserId: adminUser.id,
    farmerUserId: farmerUser.id,
    supplierUserId: supplierUser.id,
    supplierId: supplier.id,
    seasonId: season.id,
  });
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

