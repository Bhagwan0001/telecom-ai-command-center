#!/bin/sh
set -e

# Helper: strips KEY=VALUE prefix + surrounding quotes from an env var value
# Handles cases where someone pastes "DATABASE_URL=postgresql://..." as the value
clean_env_var() {
  val="$1"
  # If value starts with SOMETHING=, strip the KEY= part
  val=$(echo "$val" | sed 's/^[A-Za-z_][A-Za-z0-9_]*=//')
  # Strip leading/trailing double quotes
  val=$(echo "$val" | sed -e 's/^"//' -e 's/"$//')
  # Strip leading/trailing single quotes
  val=$(echo "$val" | sed -e "s/^'//" -e "s/'$//")
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

echo "DATABASE_URL prefix check: $(echo "$DATABASE_URL" | cut -c1-20)..."

# Sync database schema
echo "Running prisma db push..."
npx prisma db push --skip-generate --accept-data-loss

echo "Starting server..."
exec node dist/index.js
