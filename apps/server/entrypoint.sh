#!/bin/sh

# Helper: strips KEY=VALUE prefix + surrounding quotes from an env var value
clean_env_var() {
  val="$1"
  # Strip KEY=VALUE prefix if present (e.g. "DATABASE_URL=postgresql://...")
  val=$(echo "$val" | sed 's/^[A-Za-z_][A-Za-z0-9_]*=//')
  # Strip leading/trailing double quotes
  val=$(echo "$val" | sed -e 's/^"//' -e 's/"$//')
  # Strip leading/trailing single quotes
  val=$(echo "$val" | sed -e "s/^'//" -e "s/'$//")
  # Strip trailing slash
  val=$(echo "$val" | sed 's|/$||')
  # Strip surrounding whitespace
  val=$(echo "$val" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
  echo "$val"
}

if [ -n "$DATABASE_URL" ]; then
  DATABASE_URL=$(clean_env_var "$DATABASE_URL")
  export DATABASE_URL
fi

if [ -n "$REDIS_URL" ]; then
  REDIS_URL=$(clean_env_var "$REDIS_URL")
  export REDIS_URL
fi

if [ -n "$JWT_SECRET" ]; then
  JWT_SECRET=$(clean_env_var "$JWT_SECRET")
  export JWT_SECRET
fi

if [ -n "$JWT_REFRESH_SECRET" ]; then
  JWT_REFRESH_SECRET=$(clean_env_var "$JWT_REFRESH_SECRET")
  export JWT_REFRESH_SECRET
fi

if [ -n "$CORS_ORIGIN" ]; then
  CORS_ORIGIN=$(clean_env_var "$CORS_ORIGIN")
  export CORS_ORIGIN
fi

if [ -n "$GEMINI_API_KEY" ]; then
  GEMINI_API_KEY=$(clean_env_var "$GEMINI_API_KEY")
  export GEMINI_API_KEY
fi

echo "DATABASE_URL prefix: $(echo "$DATABASE_URL" | cut -c1-25)..."
echo "CORS_ORIGIN: $CORS_ORIGIN"

# Sync database schema — push schema to DB
echo "Running prisma db push..."
if npx prisma db push --skip-generate --accept-data-loss; then
  echo "DB schema synced. Running seed..."
  npx tsx prisma/seed.ts && echo "Seed complete" || echo "WARNING: Seed failed (data may already exist)"
else
  echo "WARNING: DB push failed — server will still start with empty data fallbacks"
fi

echo "Starting server..."
exec node dist/index.js

