import { z } from 'zod'

// Validation Schemas for URL
export const urlIdSchema = z.string().cuid();

// Define the URL schema
export const urlFormSchema = z.object({
    originalUrl: z.string().url("Please enter a valid URL")
});

export type TUrlForm = z.infer<typeof urlFormSchema>;