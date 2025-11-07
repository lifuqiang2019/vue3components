<template>
  <button
    :class="classes"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <i v-if="loading" class="vc-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { buttonProps, type ButtonEmits } from './types'

const bem = createNamespace('button')

defineOptions({
  name: 'VcButton'
})

const props = defineProps(buttonProps)

const emit = defineEmits<ButtonEmits>()

const classes = computed(() => {
  return [
    bem.b(),
    bem.m(props.type),
    bem.m(props.size),
    {
      [bem.is('disabled')]: props.disabled || props.loading,
      [bem.is('loading')]: props.loading,
      [bem.is('plain')]: props.plain,
      [bem.is('round')]: props.round,
      [bem.is('circle')]: props.circle
    }
  ]
})

const handleClick = (evt: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', evt)
  }
}
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(button) {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $--color-white;
  border: $--border-base;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: $--button-font-weight;
  padding: $--button-padding-vertical $--button-padding-horizontal;
  font-size: $--button-font-size;
  border-radius: $--button-border-radius;
  user-select: none;
  
  & + & {
    margin-left: 10px;
  }
  
  &:hover,
  &:focus {
    color: $--color-primary;
    border-color: mix($--color-white, $--color-primary, 60%);
    background-color: mix($--color-white, $--color-primary, 90%);
  }
  
  &:active {
    color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
    border-color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
    outline: none;
  }
  
  & [class*="vc-icon-"] {
    & + span {
      margin-left: 5px;
    }
  }
  
  @include when(disabled) {
    &,
    &:hover,
    &:focus {
      color: #c0c4cc;
      cursor: not-allowed;
      background-image: none;
      background-color: $--color-white;
      border-color: #ebeef5;
    }
  }
  
  @include when(loading) {
    pointer-events: none;
  }
  
  @include when(plain) {
    &:hover,
    &:focus {
      background: $--color-white;
      border-color: $--color-primary;
      color: $--color-primary;
    }
    
    &:active {
      background: $--color-white;
      border-color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
      color: mix($--color-black, $--color-primary, $--button-active-shade-percent);
      outline: none;
    }
  }
  
  @include when(round) {
    border-radius: 20px;
    padding: 12px 23px;
  }
  
  @include when(circle) {
    border-radius: 50%;
    padding: $--button-padding-vertical;
  }
  
  @include m(primary) {
    @include button-variant($--color-white, $--color-primary, $--color-primary);
  }
  
  @include m(success) {
    @include button-variant($--color-white, $--color-success, $--color-success);
  }
  
  @include m(warning) {
    @include button-variant($--color-white, $--color-warning, $--color-warning);
  }
  
  @include m(danger) {
    @include button-variant($--color-white, $--color-danger, $--color-danger);
  }
  
  @include m(info) {
    @include button-variant($--color-white, $--color-info, $--color-info);
  }
  
  @include m(medium) {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  
  @include m(small) {
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  
  @include m(mini) {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
}
</style>

