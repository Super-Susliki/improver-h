import { registerAs } from '@nestjs/config';

import { validateEnv } from './env.schema';

export default registerAs('app', () => {
  const env = validateEnv();

  return {
    nodeEnv: env.NODE_ENV,

    // Server configuration
    port: env.PORT,
    apiPrefix: env.API_PREFIX,
    apiUrl: env.API_URL,
    pinoLogLevel: env.PINO_LOG_LEVEL,

    // CORS configuration
    corsOrigins: env.CORS_ORIGINS,

    // Cookie configuration
    cookieSecret: env.COOKIE_SECRET,

    // Privy configuration
    privy: {
      appId: env.PRIVY_APP_ID,
      secret: env.PRIVY_SECRET,
    },

    // Database configuration
    database: {
      url: env.DATABASE_URL,
    },
  };
});
