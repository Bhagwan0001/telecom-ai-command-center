import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { morganMiddleware } from '@taicc/logger';
import { env } from './config/env';
import { apiRateLimiter } from './middlewares/rate-limit.middleware';
import { errorHandler } from './middlewares/error.middleware';
import apiRouter from './routes';

const app = express();

// --- Security Middleware ---
app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.indexOf(',') !== -1 
      ? env.CORS_ORIGIN.split(',').map(o => o.trim()) 
      : env.CORS_ORIGIN,
    credentials: true,
  })
);

// --- Compression ---
app.use(compression());

// --- Body Parsing ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Logging ---
app.use(morganMiddleware);

// --- Rate Limiting ---
app.use('/api/', apiRateLimiter);

// --- Health Check ---
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'TAICC API', version: '1.0.0' });
});

// --- Routes ---
app.use('/api/v1', apiRouter);

// --- Global Error Handler ---
app.use(errorHandler);

export { app };
