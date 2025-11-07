<template>
  <label :class="bem.b()">
    <span :class="[bem.e('input'), bem.is('checked', isChecked), bem.is('disabled', disabled)]">
      <span :class="bem.e('inner')"></span>
      <input
        :class="bem.e('original')"
        type="checkbox"
        v-model="model"
        :value="label"
        :disabled="disabled"
        @change="handleChange"
      />
    </span>
    <span :class="bem.e('label')" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { checkboxProps, type CheckboxEmits } from './types'

const bem = createNamespace('checkbox')

defineOptions({
  name: 'VcCheckbox'
})

const props = defineProps(checkboxProps)

const emit = defineEmits<CheckboxEmits>()

const checkboxGroup: any = inject('checkboxGroup', null)
const model = computed({
  get() {
    return checkboxGroup ? checkboxGroup.modelValue.value : props.modelValue
  },
  set(val) {
    if (checkboxGroup) {
      checkboxGroup.changeEvent(val)
    } else {
      emit('update:modelValue', val)
    }
  }
})

const isChecked = computed(() => {
  if (checkboxGroup) {
    return checkboxGroup.modelValue.value.includes(props.label)
  }
  return model.value
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('change', target.checked)
}
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(checkbox) {
  color: $--checkbox-font-color;
  font-weight: $--checkbox-font-weight;
  font-size: $--font-size-base;
  position: relative;
  cursor: pointer;
  display: inline-block;
  white-space: nowrap;
  user-select: none;
  
  @include e(input) {
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
    
    @include when(checked) {
      .vc-checkbox__inner {
        background-color: $--checkbox-checked-background-color;
        border-color: $--checkbox-checked-input-border-color;
        
        &::after {
          transform: rotate(45deg) scaleY(1);
        }
      }
    }
    
    @include when(disabled) {
      .vc-checkbox__inner {
        background-color: $--checkbox-disabled-background-color;
        border-color: $--checkbox-disabled-input-border-color;
        cursor: not-allowed;
        
        &::after {
          cursor: not-allowed;
          border-color: $--checkbox-disabled-icon-color;
        }
      }
      
      & + .vc-checkbox__label {
        cursor: not-allowed;
      }
    }
  }
  
  @include e(inner) {
    display: inline-block;
    position: relative;
    border: $--checkbox-input-border;
    border-radius: $--checkbox-border-radius;
    box-sizing: border-box;
    width: $--checkbox-input-width;
    height: $--checkbox-input-height;
    background-color: $--checkbox-background-color;
    z-index: $--index-normal;
    transition: border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    
    &::after {
      box-sizing: content-box;
      content: "";
      border: 1px solid $--checkbox-checked-icon-color;
      border-left: 0;
      border-top: 0;
      height: 7px;
      left: 4px;
      position: absolute;
      top: 1px;
      transform: rotate(45deg) scaleY(0);
      width: 3px;
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
  }
  
  @include e(original) {
    opacity: 0;
    outline: none;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }
  
  @include e(label) {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: $--checkbox-font-size;
  }
}
</style>

