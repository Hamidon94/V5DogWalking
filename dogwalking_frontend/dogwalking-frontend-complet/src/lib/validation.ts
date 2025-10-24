import { z } from 'zod';

// Validation schema for booking form
export const bookingFormSchema = z.object({
  petName: z.string()
    .trim()
    .min(1, "Le nom de l'animal est requis")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
  
  petType: z.string()
    .min(1, "Le type d'animal est requis"),
  
  petAge: z.string()
    .trim()
    .max(20, "L'âge ne peut pas dépasser 20 caractères")
    .regex(/^[0-9\s\w-]+$/, "Format d'âge invalide")
    .optional(),
  
  specialInstructions: z.string()
    .trim()
    .max(1000, "Les instructions ne peuvent pas dépasser 1000 caractères")
    .optional(),
  
  startDate: z.string()
    .min(1, "La date de début est requise"),
  
  endDate: z.string()
    .optional(),
  
  startTime: z.string()
    .optional(),
  
  endTime: z.string()
    .optional(),
  
  emergencyContact: z.string()
    .trim()
    .max(100, "Le nom du contact ne peut pas dépasser 100 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-']*$/, "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes")
    .optional(),
  
  emergencyPhone: z.string()
    .trim()
    .regex(/^(\+33|0)[1-9](\d{8})$|^$/, "Format de téléphone français invalide (ex: 06 12 34 56 78)")
    .optional(),
  
  additionalServices: z.array(z.string()).default([])
});

// Validation schema for search form
export const searchFormSchema = z.object({
  address: z.string()
    .trim()
    .min(3, "L'adresse doit contenir au moins 3 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s,.-]+$/, "L'adresse contient des caractères invalides"),
  
  petType: z.string(),
  serviceType: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  dogSize: z.string().optional()
});

// Validation schema for user profiles
export const profileFormSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
  
  lastName: z.string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s-']+$/, "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes"),
  
  email: z.string()
    .trim()
    .email("Format d'email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  
  phone: z.string()
    .trim()
    .regex(/^(\+33|0)[1-9](\d{8})$/, "Format de téléphone français invalide (ex: 06 12 34 56 78)"),
  
  address: z.string()
    .trim()
    .min(5, "L'adresse doit contenir au moins 5 caractères")
    .max(200, "L'adresse ne peut pas dépasser 200 caractères")
    .regex(/^[a-zA-ZÀ-ÿ0-9\s,.-]+$/, "L'adresse contient des caractères invalides"),
  
  bio: z.string()
    .trim()
    .max(500, "La biographie ne peut pas dépasser 500 caractères")
    .optional()
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type SearchFormData = z.infer<typeof searchFormSchema>;
export type ProfileFormData = z.infer<typeof profileFormSchema>;