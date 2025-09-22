#!/bin/bash
set -e

# Ждем запуска PostgreSQL
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h postgres -p 5432 -U ${POSTGRES_USER:-postgres}; do
  sleep 1
done

echo "PostgreSQL started successfully"