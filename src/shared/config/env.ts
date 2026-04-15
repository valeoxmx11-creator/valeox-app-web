import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URI: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  WHATSAPP_TARGET_NUMBER: z.string().default(''),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DATABASE_URI: process.env.DATABASE_URI,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  WHATSAPP_TARGET_NUMBER: process.env.WHATSAPP_TARGET_NUMBER,
});
