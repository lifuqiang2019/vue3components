<template>
  <component :is="tag" :class="classList" :style="colStyle">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { colProps } from './types'
import type { RowContext } from '../row/types'
import { rowContextKey } from '../row/types'

const bem = createNamespace('col')

defineOptions({
  name: 'VcCol'
})

const props = defineProps(colProps)

const row = inject<RowContext>(rowContextKey, {
  gutter: computed(() => 0)
})

const classList = computed(() => {
  const classes: string[] = [bem.b()]
  
  if (props.span) {
    classes.push(`${bem.b()}--${props.span}`)
  }
  
  if (props.offset) {
    classes.push(`${bem.b()}--offset-${props.offset}`)
  }
  
  if (props.pull) {
    classes.push(`${bem.b()}--pull-${props.pull}`)
  }
  
  if (props.push) {
    classes.push(`${bem.b()}--push-${props.push}`)
  }
  
  return classes
})

const colStyle = computed(() => {
  const styles: any = {}
  
  const gutter = row.gutter?.value ?? 0

  if (gutter) {
    const gutterNum = gutter / 2
    styles.paddingLeft = `${gutterNum}px`
    styles.paddingRight = `${gutterNum}px`
  }
  
  return styles
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";

@include b(col) {
  float: left;
  box-sizing: border-box;
  
  @for $i from 0 through 24 {
    &--#{$i} {
      width: (1 / 24 * $i * 100) * 1%;
    }
    
    &--offset-#{$i} {
      margin-left: (1 / 24 * $i * 100) * 1%;
    }
    
    &--pull-#{$i} {
      position: relative;
      right: (1 / 24 * $i * 100) * 1%;
    }
    
    &--push-#{$i} {
      position: relative;
      left: (1 / 24 * $i * 100) * 1%;
    }
  }
}
</style>

