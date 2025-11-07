<template>
  <div :class="itemClasses">
    <div :class="bem.e('header')" @click="handleClick">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <span :class="[bem.e('arrow'), { 'is-active': isActive }]"></span>
    </div>
    <transition
      name="vc-collapse-transition"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="isActive" :class="bem.e('wrapper')">
        <div :class="bem.e('content')">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { collapseItemProps, collapseInjectionKey, type CollapseActiveName } from './types'

const bem = createNamespace('collapse-item')

defineOptions({
  name: 'VcCollapseItem'
})

const props = defineProps(collapseItemProps)

const collapse = inject(collapseInjectionKey, null)

const isActive = computed(() => {
  const names = collapse?.activeNames() ?? []
  return names.includes(props.name as CollapseActiveName)
})

const itemClasses = computed(() => [
  bem.b(),
  {
    'is-active': isActive.value,
    'is-disabled': props.disabled
  }
])

const handleClick = () => {
  collapse?.toggleItem(props.name as CollapseActiveName, props.disabled)
}

const setTransitionHeight = (el: HTMLElement, height: string) => {
  el.style.height = height
}

const onBeforeEnter = (el: HTMLElement) => {
  setTransitionHeight(el, '0')
}

const onEnter = (el: HTMLElement) => {
  void el.offsetHeight
  setTransitionHeight(el, `${el.scrollHeight}px`)
}

const onAfterEnter = (el: HTMLElement) => {
  setTransitionHeight(el, 'auto')
}

const onBeforeLeave = (el: HTMLElement) => {
  setTransitionHeight(el, `${el.scrollHeight}px`)
  void el.offsetHeight
}

const onLeave = (el: HTMLElement) => {
  setTransitionHeight(el, '0')
}

const onAfterLeave = (el: HTMLElement) => {
  setTransitionHeight(el, 'auto')
}
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(collapse-item) {
  border-bottom: 1px solid #ebeef5;

  &:last-of-type {
    border-bottom: none;
  }

  @include e(header) {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: #303133;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f5f7fa;
    }
  }

  @include e(arrow) {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-right: 1.5px solid #909399;
    border-bottom: 1.5px solid #909399;
    transform: rotate(-45deg);
    transition: transform 0.2s ease;

    &.is-active {
      transform: rotate(45deg);
    }
  }

  @include e(wrapper) {
    overflow: hidden;
  }

  @include e(content) {
    padding: 16px 20px;
    font-size: 14px;
    color: #606266;
    background-color: #fff;
    line-height: 1.6;
  }

  &.is-disabled {
    .vc-collapse-item__header {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}

.vc-collapse-transition-enter-active,
.vc-collapse-transition-leave-active {
  transition: height 0.2s ease;
}

.vc-collapse-transition-enter-from,
.vc-collapse-transition-leave-to {
  height: 0;
}
</style>

