#!/bin/sh
set -e

# Strip leading/trailing quotes from DATABASE_URL (common issue when pasting from .env files into Railway)
if [ -n "$DATABASE_URL" ]; then
  DATABASE_URL=$(echo "$DATABASE_URL" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  export DATABASE_URL
fi

if [ -n "$REDIS_URL" ]; then
  REDIS_URL=$(echo "$REDIS_URL" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  export REDIS_URL
fi

if [ -n "$JWT_SECRET" ]; then
  JWT_SECRET=$(echo "$JWT_SECRET" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  export JWT_SECRET
fi

if [ -n "$JWT_REFRESH_SECRET" ]; then
  JWT_REFRESH_SECRET=$(echo "$JWT_REFRESH_SECRET" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  export JWT_REFRESH_SECRET
fi

if [ -n "$CORS_ORIGIN" ]; then
  CORS_ORIGIN=$(echo "$CORS_ORIGIN" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  export CORS_ORIGIN
fi

if [ -n "$GEMINI_API_KEY" ]; then
  GEMINI_API_KEY=$(echo "$GEMINI_API_KEY" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  export GEMINI_API_KEY
fi

echo "DATABASE_URL prefix check: $(echo "$DATABASE_URL" | cut -c1-15)..."

# Sync database schema (create tables if they don't exist)
echo "Running prisma db push..."
npx prisma db push --skip-generate --accept-data-loss

echo "Starting server..."
exec node dist/index.js
