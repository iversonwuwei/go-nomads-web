#!/usr/bin/env pwsh
<#!
.SYNOPSIS
  Go-Nomads Web - Local Docker Deploy (compose)
.EXAMPLE
  ./deploy-web-local.ps1
  ./deploy-web-local.ps1 -SkipBuild
  ./deploy-web-local.ps1 -ForceRecreate
#>
param(
  [switch]$SkipBuild,
  [switch]$ForceRecreate,
  [switch]$UseMirror,
  [switch]$Clean,
  [switch]$Help
)

$ErrorActionPreference = 'Stop'

if ($Help) {
  Write-Host "Usage: ./deploy-web-local.ps1 [-SkipBuild] [-ForceRecreate] [-UseMirror] [-Clean] [-Help]" 
  exit 0
}

function Select-ComposeCmd {
  $docker = if ($env:DOCKER_BINARY) { $env:DOCKER_BINARY } else { (Get-Command docker -ErrorAction SilentlyContinue).Path }
  if ($docker) { return @($docker, "compose") }
  $podman = if ($env:PODMAN_BINARY) { $env:PODMAN_BINARY } else { (Get-Command podman -ErrorAction SilentlyContinue).Path }
  if ($podman) { return @($podman, "compose") }
  throw "docker or podman not found"
}

# Ensure Docker Desktop (Windows) is running so compose does not fail early
function Assert-DockerReady {
  try {
    docker info | Out-Null
  }
  catch {
    Write-Host "Docker is not reachable. Please start Docker Desktop for Windows and retry." -ForegroundColor Red
    throw
  }
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent $ScriptDir
$ComposeFile = Join-Path $RootDir "docker-compose.yml"

if (-not (Test-Path $ComposeFile)) {
  throw "docker-compose.yml not found at $ComposeFile"
}

$ComposeCmd = Select-ComposeCmd
$MirrorPrefix = if ($env:MIRROR_PREFIX) { $env:MIRROR_PREFIX } else { 'docker.1ms.run' }

if ($UseMirror) {
  $env:NODE_IMAGE = "$MirrorPrefix/library/node:20.18.0-alpine"
  if (-not $env:NPM_REGISTRY_SERVER) {
    $env:NPM_REGISTRY_SERVER = 'https://registry.npmmirror.com'
  }
}

Write-Host "Using compose: $($ComposeCmd -join ' ')" -ForegroundColor Cyan
Write-Host "Project root: $RootDir" -ForegroundColor Cyan
Write-Host "Platform: linux/amd64" -ForegroundColor Cyan
if ($UseMirror) {
  Write-Host "Mirror mode: enabled" -ForegroundColor Yellow
  Write-Host "NODE_IMAGE: $env:NODE_IMAGE" -ForegroundColor Yellow
  Write-Host "NPM_REGISTRY_SERVER: $env:NPM_REGISTRY_SERVER" -ForegroundColor Yellow
}

Assert-DockerReady

# 设置构建平台环境变量
$env:DOCKER_DEFAULT_PLATFORM = "linux/amd64"
$env:DOCKER_BUILDKIT = "1"
$env:COMPOSE_DOCKER_CLI_BUILD = "1"

# 构建完整的参数列表
$upArgs = @('-f', $ComposeFile, 'up', '-d')
if (-not $SkipBuild) { $upArgs += '--build' }
if ($ForceRecreate) { $upArgs += '--force-recreate' }
if ($Clean) { $upArgs += '--remove-orphans' }

Push-Location $RootDir
try {
  & $ComposeCmd[0] $ComposeCmd[1] @upArgs
  & $ComposeCmd[0] $ComposeCmd[1] -f $ComposeFile ps
}
finally {
  Pop-Location
}

Write-Host "✅ go-nomads-web is running at http://localhost:3001" -ForegroundColor Green
