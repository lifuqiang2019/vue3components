# @vue3-components/components

Vue3 组件库核心包。

## 安装

```bash
pnpm add @vue3-components/components
```

## 使用

### 完整引入

```typescript
import { createApp } from 'vue'
import Vue3Components from '@vue3-components/components'
import App from './App.vue'

const app = createApp(App)
app.use(Vue3Components)
app.mount('#app')
```

### 按需引入

```typescript
import { VcIcon } from '@vue3-components/components'

export default {
  components: {
    VcIcon
  }
}
```

## 组件列表

- [Icon](./src/icon/README.md) - 图标组件

## 开发

```bash
# 开发模式
pnpm -C ../../play dev

# 构建
pnpm build
```

