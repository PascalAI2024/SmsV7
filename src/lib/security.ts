import { z } from 'zod';

// Input validation schemas
export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message content is required')
    .max(1600, 'Message too long')
    .refine(content => !containsBlockedWords(content), 'Message contains blocked words'),
  recipient: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

export const userInputSchema = z.object({
  name: z.string()
    .min(2, 'Name too short')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z0-9\s-_]+$/, 'Invalid characters in name'),
  email: z.string()
    .email('Invalid email format')
    .max(255, 'Email too long'),
});

// Security utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
};

export const containsBlockedWords = (content: string): boolean => {
  const blockedWords = ['script', 'eval', 'alert', 'document.cookie'];
  return blockedWords.some(word => content.toLowerCase().includes(word));
};

export const rateLimit = (() => {
  const requests = new Map<string, number[]>();
  const WINDOW_MS = 60000; // 1 minute
  const MAX_REQUESTS = 100;

  return (userId: string): boolean => {
    const now = Date.now();
    const userRequests = requests.get(userId) || [];
    
    // Clean old requests
    const recentRequests = userRequests.filter(time => now - time < WINDOW_MS);
    
    if (recentRequests.length >= MAX_REQUESTS) {
      return false; // Rate limit exceeded
    }
    
    recentRequests.push(now);
    requests.set(userId, recentRequests);
    return true;
  };
})();