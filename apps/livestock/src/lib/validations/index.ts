import { z } from 'zod';

// Shared validations across frontend and backend

export const createAnimalSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  species: z.string().min(2, "Species is required"),
  breed: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  tagNumber: z.string().min(1, "Tag number is required"),
});

export type CreateAnimalInput = z.infer<typeof createAnimalSchema>;

export const createHealthEventSchema = z.object({
  animalId: z.string().uuid(),
  type: z.enum(['VACCINATION', 'ILLNESS', 'CHECKUP', 'TREATMENT']),
  description: z.string().min(5),
  date: z.string().datetime(),
  vetId: z.string().optional(),
});

export type CreateHealthEventInput = z.infer<typeof createHealthEventSchema>;
