import { z } from "zod";

export const userRoleValues = [
  "FARMER",
  "AGENT",
  "SUPPLIER",
  "VETERINARIAN",
  "BUYER",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

export const livestockSpeciesValues = [
  "CATTLE",
  "SHEEP",
  "GOAT",
  "PIG",
  "POULTRY",
] as const;

export const healthEventTypeValues = [
  "VACCINATION",
  "TREATMENT",
  "CHECKUP",
  "ILLNESS",
  "INJURY",
  "SURGERY",
] as const;

export const applicationStatusValues = [
  "DRAFT",
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "DISBURSED",
] as const;

export const inputCategoryValues = [
  "SEEDS",
  "FERTILIZER",
  "PESTICIDE",
  "EQUIPMENT",
] as const;

export const paymentMethodValues = [
  "MOBILE_MONEY",
  "BANK",
  "CASH",
  "PRODUCE_DEDUCTION",
] as const;

export const registerSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{7,14}$/, "Phone must be in E.164 format"),
  email: z.string().trim().email().optional(),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
  role: z.enum(userRoleValues).default("FARMER"),
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
});

export const loginSchema = z.object({
  phone: z.string().trim().min(8),
  password: z.string().min(1),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(20),
});

export const updateFarmerProfileSchema = z.object({
  nationalId: z.string().trim().min(6).max(32).optional(),
  dateOfBirth: z.string().datetime().optional(),
  gender: z.string().trim().max(32).optional(),
  village: z.string().trim().max(120).optional(),
  ward: z.string().trim().max(120).optional(),
  district: z.string().trim().min(2).max(120),
  region: z.string().trim().min(2).max(120),
  farmSizeAcres: z.number().positive().max(10000).optional(),
  primaryCrop: z.string().trim().max(120).optional(),
  cropsSown: z.array(z.string().trim().min(1).max(120)).max(20).default([]),
  irrigationType: z.string().trim().max(120).optional(),
});

export const createCreditApplicationSchema = z.object({
  seasonId: z.string().min(1),
  requestedAmount: z.number().positive().max(1000000),
  purpose: z.string().trim().min(10).max(500),
  cropType: z.string().trim().min(2).max(120),
  expectedHarvestDate: z.string().datetime(),
});

export const redeemTokenSchema = z.object({
  tokenCode: z.string().trim().min(6),
  supplierId: z.string().min(1),
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(10000),
      }),
    )
    .min(1),
});

export const repaymentSchema = z.object({
  tokenId: z.string().min(1),
  amount: z.number().positive().max(10000000),
  method: z.enum(paymentMethodValues),
  reference: z.string().trim().min(2).max(120),
});

export const harvestReportSchema = z.object({
  seasonId: z.string().min(1),
  cropType: z.string().trim().min(2).max(120),
  yieldKg: z.number().positive().max(100000000),
  pricePerKg: z.number().positive().max(1000000),
  photoUrls: z.array(z.string().url()).max(10).default([]),
});

export const animalRegistrationSchema = z.object({
  tagNumber: z.string().trim().min(4).max(32),
  species: z.enum(livestockSpeciesValues),
  breed: z.string().trim().min(2).max(80).optional(),
  gender: z.enum(["male", "female", "unknown"]),
  dateOfBirth: z.string().datetime().optional(),
  birthWeightKg: z.number().positive().max(2000).optional(),
  farmId: z.string().min(1),
});

export const healthEventSchema = z.object({
  animalId: z.string().min(1),
  eventType: z.enum(healthEventTypeValues),
  eventDate: z.string().datetime(),
  description: z.string().trim().min(5).max(1000),
  drugName: z.string().trim().max(120).optional(),
  dosage: z.string().trim().max(120).optional(),
  withdrawalDays: z.number().int().min(0).max(365).optional(),
  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("LOW"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type UpdateFarmerProfileInput = z.infer<typeof updateFarmerProfileSchema>;
export type CreateCreditApplicationInput = z.infer<
  typeof createCreditApplicationSchema
>;
export type RedeemTokenInput = z.infer<typeof redeemTokenSchema>;
export type RepaymentInput = z.infer<typeof repaymentSchema>;
export type HarvestReportInput = z.infer<typeof harvestReportSchema>;
export type AnimalRegistrationInput = z.infer<typeof animalRegistrationSchema>;
export type HealthEventInput = z.infer<typeof healthEventSchema>;

