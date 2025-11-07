<template>
  <div :class="bem.b()">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, toRef } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { checkboxGroupProps, type CheckboxGroupEmits } from './types'

const bem = createNamespace('checkbox-group')

defineOptions({
  name: 'VcCheckboxGroup'
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits<CheckboxGroupEmits>()

const changeEvent = (value: any) => {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('checkboxGroup', {
  modelValue: toRef(props, 'modelValue'),
  changeEvent
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";

@include b(checkbox-group) {
  font-size: 0;
}
</style>

