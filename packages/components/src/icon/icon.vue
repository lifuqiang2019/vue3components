<template>
  <i :class="classList" :style="styleObject" @click="handleClick">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import type { IconProps } from './types'

defineOptions({
  name: 'VcIcon'
})

const props = withDefaults(defineProps<IconProps>(), {
  size: undefined,
  color: undefined,
  spin: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const bem = createNamespace('icon')

const classList = computed(() => {
  return [
    bem.b(),
    bem.is('spin', props.spin)
  ]
})

const styleObject = computed(() => {
  const style: Record<string, string> = {}
  
  if (props.size) {
    const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
    style.fontSize = sizeValue
  }
  
  if (props.color) {
    style.color = props.color
  }
  
  return style
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.vc-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  font-size: 16px;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.vc-icon.is-spin {
  animation: vc-icon-spin 1s linear infinite;
}

@keyframes vc-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

