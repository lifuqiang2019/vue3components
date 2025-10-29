# 项目架构说明

## 架构概览

Vue3 Components 采用 pnpm monorepo 架构，将项目拆分为多个独立的包，便于管理和维护。

## Monorepo 结构

```
vue3components/
├── packages/              # 所有发布的包
│   ├── components/       # 组件库
│   └── utils/           # 工具库
└── play/                # 开发测试环境（不发布）
```

## 包依赖关系

```
@vue3-components/components
    └── 依赖 @vue3-components/utils

play
    ├── 依赖 @vue3-components/components
    └── 依赖 @vue3-components/utils
```

## 各包职责

### @vue3-components/utils

**职责**: 提供通用工具函数

**主要功能**:
- BEM 命名规范工具
- 其他通用工具函数（可扩展）

**构建工具**: tsup（基于 esbuild）

**输出格式**:
- CommonJS (`.js`)
- ES Module (`.mjs`)
- TypeScript 类型声明 (`.d.ts`)

**为什么用 tsup?**
- 快速构建
- 零配置
- 自动生成类型声明
- 适合工具库

### @vue3-components/components

**职责**: 提供 Vue3 组件

**主要功能**:
- Vue 组件实现
- 组件类型定义
- 组件安装插件

**构建工具**: Vite

**输出格式**:
- ES Module (`.mjs`)
- UMD (`.js`)
- TypeScript 类型声明

**为什么用 Vite?**
- Vue 官方推荐
- 开发体验好
- 支持 Vue SFC
- 构建优化好

### play

**职责**: 开发和测试环境

**主要功能**:
- 组件开发调试
- 组件示例展示
- 功能测试

**构建工具**: Vite

## 技术选型

### 包管理器: pnpm

**优势**:
- 磁盘空间效率高（硬链接机制）
- 安装速度快
- 严格的依赖管理
- 原生支持 monorepo
- workspace 协议支持

### 构建工具

| 包 | 构建工具 | 原因 |
| --- | --- | --- |
| utils | tsup | 工具库，需要快速构建和多格式输出 |
| components | Vite | Vue 组件，需要处理 SFC 和资源 |
| play | Vite | 开发环境，需要 HMR 和快速启动 |

### TypeScript

**优势**:
- 类型安全
- 更好的 IDE 支持
- 代码提示
- 易于重构

## BEM 命名规范实现

### 设计思想

使用 JavaScript 函数动态生成 BEM 类名，而不是字符串拼接。

**优势**:
- 类型安全
- 可复用
- 易于测试
- 统一规范

### 实现细节

```typescript
// 核心函数
createBEM(block: string, namespace: string = 'vc'): BEMType

// 返回的工具对象
{
  b: () => string                                    // Block
  e: (element: string) => string                     // Element
  m: (modifier: string) => string                    // Modifier
  em: (element: string, modifier: string) => string  // Element + Modifier
  is: (name: string, state?: boolean) => string      // State
}
```

### 命名空间

默认命名空间: `vc` (vue-components)

生成的类名格式:
- Block: `vc-{block}`
- Element: `vc-{block}__{element}`
- Modifier: `vc-{block}--{modifier}`
- State: `is-{state}`

**为什么需要命名空间?**
- 避免样式冲突
- 明确组件归属
- 支持多组件库共存

## 组件开发规范

### 文件结构

每个组件遵循固定的文件结构：

```
component-name/
├── component-name.vue    # 组件实现
├── types.ts              # Props 类型定义
├── instance.ts           # 实例类型
└── index.ts              # 导出（包含 install）
```

### 组件命名

- 组件名: `VcComponentName` (Vc = Vue Components)
- 文件名: `component-name.vue` (kebab-case)
- Class 前缀: `vc-component-name`

### Props 定义

使用 TypeScript 定义 Props：

```typescript
export const componentProps = {
  prop1: {
    type: String,
    default: ''
  },
  prop2: {
    type: Number,
    default: 0
  }
} as const

export type ComponentProps = ExtractPropTypes<typeof componentProps>
```

### 组件注册

每个组件通过 `withInstall` 包装，支持：
1. 全局注册: `app.use(VcIcon)`
2. 按需引入: `import { VcIcon } from '@vue3-components/components'`

## 工作流程

### 开发新组件

```
1. 在 packages/components/src 创建组件
2. 实现组件逻辑和样式
3. 在 packages/components/src/index.ts 注册
4. 在 play/src/App.vue 添加示例
5. 启动 pnpm dev 查看效果
```

### 构建流程

```
1. pnpm build 触发所有包的构建
2. utils 包使用 tsup 构建
3. components 包使用 Vite 构建
4. 生成 dist 目录和类型声明
```

### 发布流程

```
1. 更新版本号
2. 执行 pnpm build
3. 发布各个包到 npm
```

## 样式管理

### 组件样式

目前使用 Vue SFC 的 `<style scoped>`：

**优势**:
- 自动作用域隔离
- 与组件逻辑耦合
- 开发方便

**未来扩展**:
可以创建独立的 `@vue3-components/theme-chalk` 包来管理样式：
```
packages/
└── theme-chalk/
    ├── src/
    │   ├── common/
    │   ├── icon.scss
    │   └── index.scss
    └── package.json
```

### BEM 样式示例

```scss
.vc-button {
  // Block 样式
  
  &__icon {
    // Element 样式
  }
  
  &--primary {
    // Modifier 样式
  }
  
  &.is-disabled {
    // State 样式
  }
}
```

## 扩展性

### 添加新包

1. 在 `packages/` 下创建新目录
2. 添加 `package.json`
3. 在 `pnpm-workspace.yaml` 中已自动包含
4. 其他包可以通过 `workspace:*` 引用

### 添加新组件

参考 Icon 组件的实现模式，遵循相同的文件结构和命名规范。

### 添加新工具

在 `@vue3-components/utils` 中添加新的工具函数，并在 `index.ts` 中导出。

## 性能考虑

### Tree Shaking

- 使用 ES Module 格式
- 按需导入导出
- 避免副作用代码

### 构建优化

- Vite 自动进行代码分割
- tsup 生成最小化的代码
- TypeScript 仅在开发时使用

### 运行时优化

- 使用 Composition API
- 避免不必要的响应式
- 合理使用 computed 和 watch

## 最佳实践

### 组件设计

1. **单一职责**: 每个组件只做一件事
2. **Props 设计**: 清晰的 API，合理的默认值
3. **插槽使用**: 提供灵活的内容定制
4. **事件定义**: 语义化的事件名称
5. **样式隔离**: 使用 BEM 避免冲突

### 代码规范

1. **TypeScript**: 所有代码使用 TypeScript
2. **类型定义**: 导出所有公开的类型
3. **注释**: 为公开 API 添加注释
4. **命名**: 使用有意义的变量名
5. **格式**: 保持一致的代码风格

### 文档

1. **README**: 每个包都有 README
2. **示例**: 提供使用示例
3. **类型**: TypeScript 类型即文档
4. **注释**: 关键逻辑添加注释

## 未来规划

### 短期

- [ ] 添加更多基础组件（Button, Input, etc.）
- [ ] 添加单元测试
- [ ] 添加 ESLint 和 Prettier
- [ ] 添加 Commitlint

### 中期

- [ ] 独立的样式包
- [ ] 主题定制
- [ ] 国际化支持
- [ ] 组件文档站点

### 长期

- [ ] 完整的组件库
- [ ] 设计令牌系统
- [ ] 可访问性支持
- [ ] 性能优化工具

## 参考资源

- [pnpm Workspace](https://pnpm.io/workspaces)
- [Vite 库模式](https://vitejs.dev/guide/build.html#library-mode)
- [Vue 3 组件开发](https://vuejs.org/guide/components/registration.html)
- [BEM 命名规范](https://getbem.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

