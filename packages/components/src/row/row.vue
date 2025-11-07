<template>
  <component :is="props.tag" :class="rowClasses" :style="rowStyle">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, provide, toRef } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { rowProps, rowContextKey } from './types'

const bem = createNamespace('row')

defineOptions({
  name: 'VcRow'
})

const props = defineProps(rowProps)

const gutter = toRef(props, 'gutter')

provide(rowContextKey, {
  gutter
})

const rowClasses = computed(() => {
  return [
    bem.b(),
    bem.is(`justify-${props.justify}`, props.justify !== 'start'),
    bem.is(`align-${props.align}`, props.align !== 'top')
  ].filter(Boolean)
})

const rowStyle = computed(() => {
  const styles: any = {}
  
  if (gutter.value) {
    const gutterNum = gutter.value / 2
    styles.marginLeft = `-${gutterNum}px`
    styles.marginRight = `-${gutterNum}px`
  }
  
  return styles
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";

@include b(row) {
  display: flex;
  flex-wrap: wrap;
  
  @include when(justify-center) {
    justify-content: center;
  }
  
  @include when(justify-end) {
    justify-content: flex-end;
  }
  
  @include when(justify-space-between) {
    justify-content: space-between;
  }
  
  @include when(justify-space-around) {
    justify-content: space-around;
  }
  
  @include when(align-middle) {
    align-items: center;
  }
  
  @include when(align-bottom) {
    align-items: flex-end;
  }
}
</style>

