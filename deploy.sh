#!/bin/sh
set -eu

COMPOSE_FILE="environment/development/docker/docker-compose.yml"

usage() {
  echo "Uso: ./deploy.sh {up|drop|restart|seed|logs|status}"
  echo ""
  echo "Comandos:"
  echo "  up       Sobe o ambiente Docker em background"
  echo "  drop     Para e remove containers, volumes e imagens locais do compose"
  echo "  restart  Reinicia o ambiente"
  echo "  seed     Executa seeds de estados e cidades"
  echo "  logs     Exibe logs dos servicos"
  echo "  status   Exibe status dos servicos"
}

compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

case "${1:-}" in
  up)
    compose up --build -d
    ;;
  drop)
    compose down --volumes --rmi local --remove-orphans
    ;;
  restart)
    compose down --remove-orphans
    compose up --build -d
    ;;
  seed)
    compose rm -sf seed >/dev/null 2>&1 || true
    compose up --build -d --force-recreate --remove-orphans postgres backend
    compose --profile seed run --rm seed
    ;;
  logs)
    compose logs -f
    ;;
  status)
    compose ps
    ;;
  *)
    usage
    exit 1
    ;;
esac
