# TOOLS.md - Local Notes

## 开发环境

- 包管理: Yarn 4.5.1
- 端口: dev 5100, Docker 5100
- Lint/Format: Biome 2.x
- Node.js: v20+

## 常用命令

```bash
# 开发
yarn dev

# 构建
yarn build

# Biome 检查
yarn biome check src/

# Docker 构建
docker compose up --build
```

## API 代理

- 开发环境通过 `next.config.ts` rewrites 代理到 Gateway
- 生产环境直连 `api.go-nomads.com`
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
