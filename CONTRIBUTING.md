# 贡献指南

感谢你对 Vue3 Components 的关注！

## 开发设置

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 克隆项目

```bash
git clone <your-repo-url>
cd vue3components
pnpm install
```

### 开发流程

1. 启动开发服务器

```bash
pnpm dev
```

2. 在 `play/src/App.vue` 中测试你的组件

3. 构建项目

```bash
pnpm build
```

## 添加新组件

### 1. 创建组件文件夹

在 `packages/components/src` 目录下创建新组件文件夹：

```
packages/components/src/
└── your-component/
    ├── your-component.vue    # 组件实现
    ├── types.ts              # 类型定义
    ├── instance.ts           # 实例类型
    └── index.ts              # 导出文件
```

### 2. 组件实现

**your-component.vue**

```vue
<template>
  <div :class="classList">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import type { YourComponentProps } from './types'

defineOptions({
  name: 'VcYourComponent'
})

const props = withDefaults(defineProps<YourComponentProps>(), {
  // 默认值
})

const bem = createNamespace('your-component')

const classList = computed(() => {
  return [
    bem.b()
  ]
})
</script>

<style scoped>
.vc-your-component {
  /* 样式 */
}
</style>
```

**types.ts**

```typescript
import type { ExtractPropTypes, PropType } from 'vue'

export const yourComponentProps = {
  // 定义 props
} as const

export type YourComponentProps = ExtractPropTypes<typeof yourComponentProps>
```

**instance.ts**

```typescript
import type YourComponent from './your-component.vue'

export type YourComponentInstance = InstanceType<typeof YourComponent>
```

**index.ts**

```typescript
import { withInstall } from '../utils'
import YourComponent from './your-component.vue'

export const VcYourComponent = withInstall(YourComponent)
export default VcYourComponent

export * from './types'
export type { YourComponentInstance } from './instance'
```

### 3. 注册组件

在 `packages/components/src/index.ts` 中添加：

```typescript
import { VcYourComponent } from './your-component'

const components = [
  VcIcon,
  VcYourComponent // 添加新组件
]

export { VcIcon, VcYourComponent } // 导出新组件
```

### 4. 添加示例

在 `play/src/App.vue` 中添加组件示例进行测试。

## BEM 命名规范

使用 BEM 命名规范确保样式的可维护性：

```typescript
const bem = createNamespace('component-name')

bem.b()              // vc-component-name
bem.e('element')     // vc-component-name__element
bem.m('modifier')    // vc-component-name--modifier
bem.em('element', 'modifier') // vc-component-name__element--modifier
bem.is('state')      // is-state
```

## 提交规范

使用语义化的提交信息：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：

```
feat: 添加 Button 组件
fix: 修复 Icon 组件颜色属性不生效的问题
docs: 更新 README
```

## 代码风格

- 使用 TypeScript
- 使用 Vue 3 Composition API
- 遵循 ESLint 规则
- 保持代码简洁和可读性

## Pull Request

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

感谢你的贡献！🎉

