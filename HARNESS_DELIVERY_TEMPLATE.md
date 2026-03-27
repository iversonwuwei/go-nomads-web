# Harness Delivery Template

每次 web 改动默认按以下结构交付：

## 1. Requirement Frame

- 页面或交互目标
- 影响的接口、路由、状态和调用方
- 正常路径、失败路径、兼容约束

## 2. Change Plan

- 根因或需求落点
- 最小闭环改动
- 回滚影响面

## 3. Validation

- 已执行的 type check、build、手测场景
- 未验证设备、浏览器或路径

## 4. Observability

- 关键错误反馈、日志或埋点
- 出问题时如何快速定位

## 5. Delivery Summary

- 已实现
- 已验证
- 剩余风险
- 下一步建议
