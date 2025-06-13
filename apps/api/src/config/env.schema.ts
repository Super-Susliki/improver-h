import { z } from 'zod';

export const envSchema = z.object({
  // Application
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  API_PREFIX: z.string().default('api'),
  API_URL: z.string().default('http://localhost:3000'),
  PINO_LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace'])
    .default('info'),

  // CORS
  CORS_ORIGINS: z.string().default('http://localhost:4200'),

  // Cookies and Security
  COOKIE_SECRET: z
    .string()
    .min(32, 'Cookie secret should be at least 32 characters long'),

  // Privy
  PRIVY_APP_ID: z.string(),
  PRIVY_SECRET: z.string(),

  // Database
  DATABASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

export function validateEnv(): EnvSchema {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage =
        'Environment validation failed:\n' +
        error.errors
          .map((err) => `- ${err.path.join('.')}: ${err.message}`)
          .join('\n');
      throw new Error(errorMessage);
    }
    throw error;
  }
}
