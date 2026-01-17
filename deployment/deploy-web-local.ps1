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
  [switch]$Help
)

$ErrorActionPreference = 'Stop'

if ($Help) {
  Write-Host "Usage: ./deploy-web-local.ps1 [-SkipBuild] [-ForceRecreate] [-Help]" 
  exit 0
}

function Select-ComposeCmd {
  $docker = if ($env:DOCKER_BINARY) { $env:DOCKER_BINARY } else { (Get-Command docker -ErrorAction SilentlyContinue).Path }
  if ($docker) { return "$docker compose" }
  $podman = if ($env:PODMAN_BINARY) { $env:PODMAN_BINARY } else { (Get-Command podman -ErrorAction SilentlyContinue).Path }
  if ($podman) { return "$podman compose" }
  throw "docker or podman not found"
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RootDir = Split-Path -Parent $ScriptDir
$ComposeFile = Join-Path $RootDir "docker-compose.yml"

if (-not (Test-Path $ComposeFile)) {
  throw "docker-compose.yml not found at $ComposeFile"
}

$ComposeCmd = Select-ComposeCmd
Write-Host "Using compose: $ComposeCmd" -ForegroundColor Cyan
Write-Host "Project root: $RootDir" -ForegroundColor Cyan

$buildArg = if ($SkipBuild) { @() } else { @('--build') }
$recreateArg = if ($ForceRecreate) { @('--force-recreate') } else { @() }

Push-Location $RootDir
try {
  & $ComposeCmd -f $ComposeFile up -d @buildArg @recreateArg
  & $ComposeCmd -f $ComposeFile ps
}
finally {
  Pop-Location
}

Write-Host "✅ go-nomads-web is running at http://localhost:3000" -ForegroundColor Green
