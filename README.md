# Vue3 Components

一个基于 Vue3 的组件库，使用 pnpm monorepo 架构开发。

## 特性

- 🚀 基于 Vue3 + TypeScript
- 📦 使用 pnpm workspace 进行 monorepo 管理
- 🎨 BEM 命名规范（JavaScript 实现）
- 🔧 Vite 构建工具
- 📝 完整的 TypeScript 类型支持

## 项目结构

```
vue3components/
├── packages/
│   ├── components/          # 组件库
│   │   ├── src/
│   │   │   ├── icon/       # Icon 组件
│   │   │   └── utils/      # 组件工具函数
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── utils/              # 工具库
│       ├── src/
│       │   ├── bem.ts      # BEM 命名工具
│       │   └── index.ts
│       ├── package.json
│       └── tsup.config.ts
├── play/                   # 开发调试环境
│   ├── src/
│   │   ├── App.vue
│   │   └── main.ts
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

## 安装

首先确保你已经安装了 pnpm：

```bash
npm install -g pnpm
```

克隆项目并安装依赖：

```bash
git clone <your-repo-url>
cd vue3components
pnpm install
```

## 开发

启动开发服务器：

```bash
pnpm dev
```

这将启动 play 项目，你可以在浏览器中查看组件示例。

## 构建

构建所有包：

```bash
pnpm build
```

清理构建产物：

```bash
pnpm clean
```

## BEM 命名规范

项目使用 JavaScript 实现的 BEM 命名规范工具，位于 `@vue3-components/utils` 包中。

### 使用方法

```typescript
import { createNamespace } from '@vue3-components/utils'

const bem = createNamespace('button')

// Block: vc-button
bem.b()

// Element: vc-button__icon
bem.e('icon')

// Modifier: vc-button--primary
bem.m('primary')

// Element + Modifier: vc-button__icon--large
bem.em('icon', 'large')

// State: is-disabled
bem.is('disabled')

// 条件状态: is-active 或 ''
bem.is('active', true)  // 'is-active'
bem.is('active', false) // ''
```

### 自定义命名空间

```typescript
import { createNamespaceFn } from '@vue3-components/utils'

const createNamespace = createNamespaceFn('my-ui')
const bem = createNamespace('button')

bem.b() // 'my-ui-button'
```

## Icon 组件

Icon 组件是一个灵活的图标容器组件，支持自定义大小、颜色和动画。

### 基础用法

```vue
<template>
  <vc-icon>
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor">
      <!-- SVG 内容 -->
    </svg>
  </vc-icon>
</template>
```

### API

#### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 图标大小 | `number \| string` | `undefined` |
| color | 图标颜色 | `string` | `undefined` |
| spin | 是否旋转动画 | `boolean` | `false` |

#### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击图标时触发 | `(event: MouseEvent) => void` |

#### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义图标内容，通常是 SVG |

### 示例

#### 自定义大小

```vue
<vc-icon :size="16"><!-- SVG --></vc-icon>
<vc-icon :size="24"><!-- SVG --></vc-icon>
<vc-icon size="32px"><!-- SVG --></vc-icon>
```

#### 自定义颜色

```vue
<vc-icon color="#1890ff"><!-- SVG --></vc-icon>
<vc-icon color="#52c41a"><!-- SVG --></vc-icon>
```

#### 旋转动画

```vue
<vc-icon :spin="true"><!-- SVG --></vc-icon>
```

#### 点击事件

```vue
<vc-icon @click="handleClick"><!-- SVG --></vc-icon>
```

## 添加新组件

1. 在 `packages/components/src` 目录下创建组件文件夹
2. 创建组件文件（`.vue`）、类型定义（`types.ts`）和导出文件（`index.ts`）
3. 在 `packages/components/src/index.ts` 中注册组件
4. 在 `play/src/App.vue` 中添加示例

## 技术栈

- **Vue 3**: 渐进式 JavaScript 框架
- **TypeScript**: JavaScript 的超集，提供类型支持
- **Vite**: 下一代前端构建工具
- **pnpm**: 快速、节省磁盘空间的包管理器
- **tsup**: 基于 esbuild 的 TypeScript 构建工具

## License

MIT

