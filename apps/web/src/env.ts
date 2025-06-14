import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /**
   * The prefix that client-side variables must have. This is enforced both at
   * a type-level and at runtime.
   */
  clientPrefix: "VITE_",

  client: {
    VITE_PRIVY_APP_ID: z.string().min(1),
    VITE_PRIVY_CLIENT_ID: z.string().min(1),
    VITE_API_BASE_URL: z.string().url().optional(),
    VITE_NODE_ENV: z.enum(["development", "test", "production"]).optional(),
    VITE_API_URL: z.string().url().default("http://localhost:3000/api"),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: {
    VITE_PRIVY_APP_ID: import.meta.env.VITE_PRIVY_APP_ID,
    VITE_PRIVY_CLIENT_ID: import.meta.env.VITE_PRIVY_CLIENT_ID,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE,
  },

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
