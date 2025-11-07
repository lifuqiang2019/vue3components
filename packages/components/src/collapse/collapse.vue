<template>
  <div :class="wrapperClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { collapseProps, collapseInjectionKey, type CollapseEmits, type CollapseActiveName } from './types'

const bem = createNamespace('collapse')

defineOptions({
  name: 'VcCollapse'
})

const props = defineProps(collapseProps)

const emit = defineEmits<CollapseEmits>()

const activeNames = computed<CollapseActiveName[]>(() => {
  if (props.accordion) {
    if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') {
      return []
    }
    return [props.modelValue as CollapseActiveName]
  }

  if (Array.isArray(props.modelValue)) {
    return props.modelValue as CollapseActiveName[]
  }

  if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') {
    return []
  }

  return [props.modelValue as CollapseActiveName]
})

const wrapperClasses = computed(() => [
  bem.b(),
  bem.is('accordion', props.accordion)
])

const setActiveNames = (value: CollapseActiveName[] | CollapseActiveName) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const toggleItem = (name: CollapseActiveName, disabled: boolean) => {
  if (disabled) return

  if (props.accordion) {
    const current = activeNames.value[0]
    const value = current === name ? '' : name
    setActiveNames(value)
  } else {
    const value = activeNames.value.slice()
    const index = value.indexOf(name)
    if (index > -1) {
      value.splice(index, 1)
    } else {
      value.push(name)
    }
    setActiveNames(value)
  }
}

provide(collapseInjectionKey, {
  activeNames: () => activeNames.value,
  toggleItem,
  accordion: () => props.accordion
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(collapse) {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
}

.is-accordion {
  border-radius: 4px;
}
</style>

