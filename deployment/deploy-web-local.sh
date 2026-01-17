#!/usr/bin/env bash

# ============================================================
# Go-Nomads Web - Local Docker Deploy (compose)
# Usage: bash deploy-web-local.sh [--skip-build] [--force-recreate] [--help]
# ============================================================
set -euo pipefail

SKIP_BUILD=false
FORCE_RECREATE=false

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
    --help|-h)
      cat <<'EOF'
Usage: ./deploy-web-local.sh [options]

Options:
  --skip-build        Do not rebuild the image, reuse existing local image
  --force-recreate    Force container recreation even if config unchanged
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

COMPOSE_CMD="$(select_runtime)"

if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "Error: docker-compose.yml not found at $COMPOSE_FILE" >&2
  exit 1
fi

cd "$ROOT_DIR"

BUILD_FLAG="--build"
[[ "$SKIP_BUILD" == true ]] && BUILD_FLAG=""

RECREATE_FLAG=""
[[ "$FORCE_RECREATE" == true ]] && RECREATE_FLAG="--force-recreate"

echo "Using compose: $COMPOSE_CMD"
echo "Project root: $ROOT_DIR"

$COMPOSE_CMD -f "$COMPOSE_FILE" up -d $BUILD_FLAG $RECREATE_FLAG

$COMPOSE_CMD -f "$COMPOSE_FILE" ps

echo "✅ go-nomads-web is running at http://localhost:3001"
