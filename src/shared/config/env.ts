import { z } from 'zod';

const csvToArray = (value: string | undefined): string[] => {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_ENV: z.enum(['local', 'staging', 'production']).default('local'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  DATABASE_URI: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(32),
  PAYLOAD_PUBLIC_SERVER_URL: z.string().url().optional(),
  PAYLOAD_CORS_ORIGINS: z.string().optional(),
  PAYLOAD_CSRF_ORIGINS: z.string().optional(),
  WHATSAPP_TARGET_NUMBER: z.string().default(''),
});

const parsed = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  APP_ENV: process.env.APP_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  DATABASE_URI: process.env.DATABASE_URI,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  PAYLOAD_CORS_ORIGINS: process.env.PAYLOAD_CORS_ORIGINS,
  PAYLOAD_CSRF_ORIGINS: process.env.PAYLOAD_CSRF_ORIGINS,
  WHATSAPP_TARGET_NUMBER: process.env.WHATSAPP_TARGET_NUMBER,
});

export const env = {
  ...parsed,
  PAYLOAD_CORS_ORIGINS: csvToArray(parsed.PAYLOAD_CORS_ORIGINS),
  PAYLOAD_CSRF_ORIGINS: csvToArray(parsed.PAYLOAD_CSRF_ORIGINS),
};
