// import dotenv from 'dotenv';
// import { z } from 'zod';

// dotenv.config();

// const envSchema = z.object({
//   NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
//   PORT: z.coerce.number().default(4000),
//   DATABASE_URL: z.string().url().default('postgresql://postgres:postgres@localhost:5432/taicc'),
//   REDIS_URL: z.string().default('redis://localhost:6379'),
//   JWT_SECRET: z.string().min(32).default('change-this-to-a-secure-secret-in-production'),
//   JWT_REFRESH_SECRET: z.string().min(32).default('change-this-refresh-secret-in-production'),
//   CORS_ORIGIN: z.string().default('http://localhost:3000'),
// });

// const parsed = envSchema.safeParse(process.env);

// if (!parsed.success) {
//   console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
//   process.exit(1);
// }

// export const env = parsed.data;
// export type Env = z.infer<typeof envSchema>;



import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const cleanEnvString = z.preprocess((val) => {
  if (typeof val !== "string") return val;
  return val.replace(/^["']|["']$/g, "").trim();
}, z.string());

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: cleanEnvString,
  REDIS_URL: cleanEnvString.default("redis://localhost:6379"),
  JWT_SECRET: cleanEnvString.pipe(z.string().min(32)),
  JWT_REFRESH_SECRET: cleanEnvString.pipe(z.string().min(32)),
  CORS_ORIGIN: cleanEnvString,

  GEMINI_API_KEY: cleanEnvString.pipe(z.string().min(1)),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error('Invalid environment variables: ' + JSON.stringify(parsed.error.flatten().fieldErrors));
}

export const env = parsed.data;