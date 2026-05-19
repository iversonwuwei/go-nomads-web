---
applyTo: "src/**/*.{ts,tsx}"
---

# Next.js Web 端开发规范

## Harness Engineering 基线
- 本工程默认遵循根目录 `HARNESS_ENGINEERING_CHECKLIST.md`。
- 交付说明默认遵循根目录 `HARNESS_DELIVERY_TEMPLATE.md`。
- 开发前先明确边界、调用方、失败路径与验证方式；交付时区分已实现、已验证、剩余风险。
- 前端改动必须同时检查接口契约、加载态、错误态、空态、埋点或日志可观测性，以及回滚影响面。

## 技术栈
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + DaisyUI 5（`data-theme="light"`）
- HeadlessUI（无障碍组件）
- Geist 字体（Sans + Mono）
- React Compiler 已启用，不需要手动 memo/useMemo 优化
- Biome 2.x（lint + format，不使用 ESLint/Prettier）

## App Router 约定
- 页面: `src/app/{route}/page.tsx`
- 布局: `src/app/{route}/layout.tsx`
- API 路由: `src/app/api/{route}/route.ts`
- 新增页面优先使用 Server Component
- 需要交互时用 `"use client"` 指令

## 组件规范
- 共享组件放 `src/app/components/`
- 工具函数放 `src/app/lib/`
- 组件命名: PascalCase（`CityCard.tsx`）
- 使用 DaisyUI 组件类（`btn`, `card`, `modal` 等）
- 不要使用 emoji 作为图标

## 样式
- 优先使用 Tailwind utility classes
- DaisyUI 语义类优先于自定义 Tailwind
- 响应式设计: `sm:` → `md:` → `lg:` → `xl:`
- 深色模式通过 DaisyUI theme 切换，不要手写 `dark:` 类

## 代码质量
- Biome 自动格式化，不要手动调整格式
- 导入排序由 Biome 管理
- 类型定义优先使用 `type`（`type Props = {}`）
- 不要使用 `any` 类型

## 部署
- 输出: `standalone` 模式
- Docker 端口: 5100
- CSS 优化: LightningCSS
