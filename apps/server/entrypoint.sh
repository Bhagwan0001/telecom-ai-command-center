#!/bin/sh

# Clean leading/trailing quotes and whitespaces from environment variables
if [ -n "$DATABASE_URL" ]; then
  export DATABASE_URL=$(echo "$DATABASE_URL" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
fi

if [ -n "$REDIS_URL" ]; then
  export REDIS_URL=$(echo "$REDIS_URL" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
fi

if [ -n "$JWT_SECRET" ]; then
  export JWT_SECRET=$(echo "$JWT_SECRET" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
fi

if [ -n "$JWT_REFRESH_SECRET" ]; then
  export JWT_REFRESH_SECRET=$(echo "$JWT_REFRESH_SECRET" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
fi

if [ -n "$CORS_ORIGIN" ]; then
  export CORS_ORIGIN=$(echo "$CORS_ORIGIN" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
fi

if [ -n "$GEMINI_API_KEY" ]; then
  export GEMINI_API_KEY=$(echo "$GEMINI_API_KEY" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
fi

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting application..."
exec node dist/index.js
