# @vue3-components/utils

Vue3 组件库工具函数包。

## 安装

```bash
pnpm add @vue3-components/utils
```

## 工具函数

### BEM 命名工具

提供符合 BEM（Block Element Modifier）规范的类名生成工具。

```typescript
import { createNamespace } from '@vue3-components/utils'

const bem = createNamespace('button')

// Block
bem.b() // 'vc-button'

// Element
bem.e('icon') // 'vc-button__icon'

// Modifier
bem.m('primary') // 'vc-button--primary'

// Element + Modifier
bem.em('icon', 'large') // 'vc-button__icon--large'

// State
bem.is('disabled') // 'is-disabled'
bem.is('active', true) // 'is-active'
bem.is('active', false) // ''
```

### 自定义命名空间

```typescript
import { createNamespaceFn } from '@vue3-components/utils'

const createNamespace = createNamespaceFn('my-ui')
const bem = createNamespace('button')

bem.b() // 'my-ui-button'
```

## API

### createBEM(block, namespace?)

创建 BEM 命名函数。

- **block**: `string` - 块名称
- **namespace**: `string` - 命名空间，默认为 `'vc'`
- **返回值**: `BEMType` - BEM 工具函数集合

### createNamespace(block)

使用默认命名空间 `'vc'` 创建 BEM 命名函数。

- **block**: `string` - 块名称
- **返回值**: `BEMType` - BEM 工具函数集合

### createNamespaceFn(namespace)

创建自定义命名空间的函数。

- **namespace**: `string` - 自定义命名空间
- **返回值**: `(block: string) => BEMType` - 创建 BEM 的函数

## 类型定义

```typescript
type BEMType = {
  b: () => string
  e: (element: string) => string
  m: (modifier: string) => string
  em: (element: string, modifier: string) => string
  is: (name: string, state?: boolean) => string
}
```

