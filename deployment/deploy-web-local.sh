#!/usr/bin/env bash

# ============================================================
# Go-Nomads Web - Local Docker Deploy (compose)
# Usage: bash deploy-web-local.sh [--skip-build] [--force-recreate] [--use-mirror] [--help]
# ============================================================
set -euo pipefail

SKIP_BUILD=false
FORCE_RECREATE=false
USE_MIRROR=false
WEB_HOST_PORT="${WEB_HOST_PORT:-5100}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-build)
      SKIP_BUILD=true
      shift
      ;;
    --force-recreate)
      FORCE_RECREATE=true
      shift
      ;;
    --use-mirror)
      USE_MIRROR=true
      shift
      ;;
    --help|-h)
      cat <<'EOF'
Usage: ./deploy-web-local.sh [options]

Options:
  --skip-build        Do not rebuild the image, reuse existing local image
  --force-recreate    Force container recreation even if config unchanged
  --use-mirror        Force domestic mirror for Node base image and npm registry
  --help, -h          Show this help
EOF
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILE="$ROOT_DIR/docker-compose.yml"
MIRROR_PREFIX="${MIRROR_PREFIX:-docker.1ms.run}"

ensure_port_available() {
  local port="$1"

  if ! command -v lsof >/dev/null 2>&1; then
    return
  fi

  local pid command_line
  pid="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null | head -n 1 || true)"
  if [[ -z "$pid" ]]; then
    return
  fi

  command_line="$(ps -ww -p "$pid" -o command= 2>/dev/null | sed 's/^ *//' || true)"
  echo "Error: host port $port is already in use." >&2
  if [[ -n "$command_line" ]]; then
    echo "Owner: PID $pid -> $command_line" >&2
  else
    echo "Owner: PID $pid" >&2
  fi
  echo "Hint: stop the process using port $port, or rerun with WEB_HOST_PORT=<free-port>." >&2
  exit 1
}

if [[ "$USE_MIRROR" == true ]]; then
  export NODE_IMAGE="${MIRROR_PREFIX}/library/node:20.18.0-alpine"
  export NPM_REGISTRY_SERVER="${NPM_REGISTRY_SERVER:-https://registry.npmmirror.com}"
fi

# select docker or podman
select_runtime() {
  local docker_bin podman_bin
  docker_bin="${DOCKER_BINARY:-$(command -v docker || true)}"
  podman_bin="${PODMAN_BINARY:-$(command -v podman || true)}"

  if [[ -n "$docker_bin" ]]; then
    echo "$docker_bin compose"
    return
  fi

  if [[ -n "$podman_bin" ]]; then
    echo "$podman_bin compose"
    return
  fi

  echo "Error: docker or podman not found" >&2
  exit 1
}

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Error: docker-compose.yml not found at $COMPOSE_FILE" >&2
  exit 1
fi

COMPOSE_CMD="$(select_runtime)"

cd "$ROOT_DIR"

echo "Using compose: $COMPOSE_CMD"
echo "Project root: $ROOT_DIR"
echo "Host port: ${WEB_HOST_PORT}"
if [[ "$USE_MIRROR" == true ]]; then
  echo "Mirror mode: enabled"
  echo "NODE_IMAGE: ${NODE_IMAGE}"
  echo "NPM_REGISTRY_SERVER: ${NPM_REGISTRY_SERVER}"
fi

ensure_port_available "$WEB_HOST_PORT"

cmd=( $COMPOSE_CMD -f "$COMPOSE_FILE" up -d )
[[ "$SKIP_BUILD" == true ]] || cmd+=(--build)
[[ "$FORCE_RECREATE" == true ]] && cmd+=(--force-recreate)
"${cmd[@]}"

ps_cmd=( $COMPOSE_CMD -f "$COMPOSE_FILE" ps )
"${ps_cmd[@]}"

echo "✅ go-nomads-web is running at http://localhost:${WEB_HOST_PORT}"
