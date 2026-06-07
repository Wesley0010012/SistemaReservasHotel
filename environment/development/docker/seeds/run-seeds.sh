#!/bin/sh
set -eu

export PGPASSWORD="${POSTGRES_PASSWORD}"

echo "Aguardando tabelas do TypeORM..."
until psql \
  -h postgres \
  -U "${POSTGRES_USER}" \
  -d "${POSTGRES_DB}" \
    -tAc "SELECT to_regclass('public.estados') IS NOT NULL AND to_regclass('public.cidades') IS NOT NULL AND to_regclass('public.hospedes') IS NOT NULL;" | grep -q t; do
  sleep 2
done

echo "Executando seeds..."
for seed_file in /seeds/*.sql; do
  echo "Executando ${seed_file}..."
  psql \
    -h postgres \
    -U "${POSTGRES_USER}" \
    -d "${POSTGRES_DB}" \
    -f "${seed_file}"
done

echo "Seeds finalizados."
