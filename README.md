# Vue3 Component Library

A modern, lightweight Vue3 component library built with TypeScript and composition API, following the monorepo architecture.

## 🎯 Project Structure

This project is organized as a monorepo using pnpm workspaces:

```
vue3components/
├── packages/
│   ├── components/     # Component library source code
│   │   └── src/
│   │       ├── button/     # Button component
│   │       ├── checkbox/   # Checkbox & CheckboxGroup
│   │       ├── col/        # Column layout component
│   │       ├── form/       # Form & FormItem components
│   │       ├── icon/       # Icon component
│   │       ├── input/      # Input component
│   │       ├── row/        # Row layout component
│   │       ├── styles/     # Global styles and mixins
│   │       └── index.ts    # Main entry point
│   └── utils/          # Utility functions (BEM, install helper)
└── play/               # Development playground for testing components
```

## ✨ Implemented Components

### Layout Components
- ✅ **Row**: Flexible row layout with gutter support
- ✅ **Col**: Column component with span, offset, push, pull support

### Form Components
- ✅ **Button**: Multiple types (primary, success, warning, danger, info), sizes, loading state
- ✅ **Input**: Text input, textarea, password, with clearable and show-password features
- ✅ **Checkbox**: Single checkbox and checkbox group
- ✅ **Form**: Form container with validation support
- ✅ **FormItem**: Form field with label, validation, and error display

### Basic Components
- ✅ **Icon**: SVG icon wrapper with size, color, and spin animation support

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

### Usage

```vue
<template>
  <div>
    <!-- Button -->
    <vc-button type="primary">Primary Button</vc-button>
    
    <!-- Layout -->
    <vc-row :gutter="20">
      <vc-col :span="12">Column 1</vc-col>
      <vc-col :span="12">Column 2</vc-col>
    </vc-row>
    
    <!-- Form -->
    <vc-form :model="formData" :rules="rules">
      <vc-form-item label="Username" prop="username">
        <vc-input v-model="formData.username" />
      </vc-form-item>
      
      <vc-form-item label="Password" prop="password">
        <vc-input v-model="formData.password" type="password" show-password />
      </vc-form-item>
      
      <vc-form-item>
        <vc-button type="primary" @click="submit">Submit</vc-button>
      </vc-form-item>
    </vc-form>
    
    <!-- Checkbox -->
    <vc-checkbox-group v-model="selected">
      <vc-checkbox label="Option 1" />
      <vc-checkbox label="Option 2" />
      <vc-checkbox label="Option 3" />
    </vc-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const formData = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
}

const selected = ref([])

const submit = () => {
  // Handle form submission
}
</script>
```

## 📦 Component API

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` | Button type |
| size | `'default' \| 'medium' \| 'small' \| 'mini'` | `'default'` | Button size |
| loading | `boolean` | `false` | Loading state |
| disabled | `boolean` | `false` | Disabled state |
| plain | `boolean` | `false` | Plain style |
| round | `boolean` | `false` | Round corners |
| circle | `boolean` | `false` | Circle shape |

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| modelValue | `string \| number` | `''` | Binding value |
| type | `string` | `'text'` | Input type |
| placeholder | `string` | `''` | Placeholder text |
| disabled | `boolean` | `false` | Disabled state |
| clearable | `boolean` | `false` | Show clear button |
| show-password | `boolean` | `false` | Toggle password visibility |

### Form

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| model | `object` | `{}` | Form data model |
| rules | `object` | `{}` | Validation rules |
| label-position | `'left' \| 'right' \| 'top'` | `'right'` | Label position |
| label-width | `string` | `''` | Label width |
| inline | `boolean` | `false` | Inline form |

## 🎨 Design System

The component library follows a consistent design system based on BEM methodology:

- **Namespace**: `vc-` (Vue Components)
- **Colors**: Primary (#409eff), Success (#67c23a), Warning (#e6a23c), Danger (#f56c6c), Info (#909399)
- **Sizes**: Default, Medium, Small, Mini
- **Border Radius**: 4px (base), 2px (small)

## 🛠️ Development

### Prerequisites

- Node.js >= 16
- pnpm >= 8

### Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build packages
pnpm build

# Clean build artifacts
pnpm clean
```

### Project Configuration

The project uses:
- **Vue 3.3+** with Composition API
- **TypeScript** for type safety
- **Vite** for fast development and building
- **SCSS** for styling with BEM methodology
- **pnpm** workspaces for monorepo management

## 📋 Roadmap

### Pending Components

- ⏳ Transfer Component
- ⏳ Collapse/Accordion Component
- ⏳ Infinite Scroll Directive
- ⏳ Virtual Tree Component

### Future Enhancements

- Component documentation site
- Unit tests with Vitest
- E2E tests with Playwright
- Storybook integration
- CI/CD pipeline

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📖 References

This component library is built based on tutorials from:
- [Vue3组件库教程](http://course.fulljs.cn/component/)

## 🔗 Links

- [Vue 3 Documentation](https://vuejs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
