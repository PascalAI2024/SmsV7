import { z } from 'zod';

export const messageVariantSchema = z.object({
  content: z.string().min(1, 'Message content is required'),
  variables: z.array(z.string()),
});

export const contactSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  status: z.enum(['pending', 'sent', 'failed']),
});

export const sessionConfigSchema = z.object({
  duration: z.number().min(1).max(24),
  messagesPerHour: z.number().min(1).max(1000),
  provider: z.object({
    id: z.string(),
    name: z.string(),
    apiKey: z.string().optional(),
  }),
});

export type MessageVariant = z.infer<typeof messageVariantSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type SessionConfig = z.infer<typeof sessionConfigSchema>;