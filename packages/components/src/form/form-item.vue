<template>
  <div :class="classes">
    <label v-if="label" :class="bem.e('label')" :style="labelStyle">
      {{ label }}
      <span v-if="isRequired" class="vc-form-item__required-mark">*</span>
    </label>
    <div :class="bem.e('content')" @blur.capture="onFieldBlur" @change.capture="onFieldChange">
      <slot></slot>
      <transition name="vc-zoom-in-top">
        <div v-if="validateState === 'error' && showMessage" :class="bem.e('error')">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onBeforeUnmount, provide, ref } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { formItemProps, type FormContext } from './types'
import Schema from 'async-validator'

const bem = createNamespace('form-item')

defineOptions({
  name: 'VcFormItem'
})

const props = defineProps(formItemProps)

const form = inject<FormContext>('form', {} as FormContext)

const validateState = ref<'success' | 'error' | 'validating' | ''>('')
const validateMessage = ref('')

const labelStyle = computed(() => {
  const ret: any = {}
  if (form.labelPosition === 'top') return ret
  const labelWidth = props.labelWidth || form.labelWidth
  if (labelWidth) {
    ret.width = labelWidth
  }
  return ret
})

const classes = computed(() => {
  return [
    bem.b(),
    {
      [bem.is('error')]: validateState.value === 'error',
      [bem.is('validating')]: validateState.value === 'validating',
      [bem.is('success')]: validateState.value === 'success',
      [bem.is('required')]: isRequired.value
    }
  ]
})

const showMessage = computed(() => {
  return props.showMessage && form.showMessage !== false
})

// 获取当前字段的所有规则（优先使用 props.rules，否则从 form.rules 中获取）
const getRules = () => {
  let formRules = props.rules
  
  // 如果 props.rules 为空，从 form.rules 中根据 prop 获取
  if ((!formRules || (Array.isArray(formRules) && formRules.length === 0)) && props.prop && form.rules) {
    formRules = form.rules[props.prop]
  }
  
  // 确保返回数组
  if (!formRules) return []
  return Array.isArray(formRules) ? formRules : [formRules]
}

const isRequired = computed(() => {
  const rules = getRules()
  if (rules.length === 0) return false
  return rules.some((rule: any) => rule.required)
})

const getFilteredRules = (trigger?: string) => {
  const rules = getRules()
  return rules.filter((rule: any) => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

const onFieldBlur = () => {
  validate('blur')
}

const onFieldChange = () => {
  validate('change')
}

const validate = async (trigger?: string, callback?: (message: string) => void): Promise<boolean> => {
  const rules = getFilteredRules(trigger)
  
  if (rules.length === 0) {
    if (callback) callback('')
    return true
  }
  
  validateState.value = 'validating'
  
  const descriptor: any = {}
  if (props.prop) {
    descriptor[props.prop] = rules
  }
  
  const validator = new Schema(descriptor)
  const model: any = {}
  if (props.prop && form.model) {
    model[props.prop] = form.model[props.prop]
  }
  
  try {
    await validator.validate(model)
    validateState.value = 'success'
    validateMessage.value = ''
    if (callback) callback('')
    return true
  } catch (error: any) {
    const { errors } = error
    validateState.value = 'error'
    validateMessage.value = errors ? errors[0].message : 'Validation failed'
    if (callback) callback(validateMessage.value)
    throw validateMessage.value
  }
}

const resetField = () => {
  validateState.value = ''
  validateMessage.value = ''
  
  if (props.prop && form.model) {
    const initialValue = form.model[props.prop]
    if (initialValue !== undefined) {
      form.model[props.prop] = initialValue
    }
  }
}

const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
}

onMounted(() => {
  if (props.prop) {
    form.addField?.({
      prop: props.prop,
      validate,
      resetField,
      clearValidate
    })
  }
})

onBeforeUnmount(() => {
  form.removeField?.({
    prop: props.prop
  })
})

provide('formItem', {
  validate,
  prop: props.prop
})

defineExpose({
  validate,
  resetField,
  clearValidate
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(form-item) {
  margin-bottom: 22px;
  
  @include e(label) {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  
  @include e(required-mark) {
    color: $--color-danger;
    margin-left: 4px;
  }
  
  @include e(content) {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    
    &::before,
    &::after {
      display: table;
      content: "";
    }
    
    &::after {
      clear: both;
    }
  }
  
  @include e(error) {
    color: $--color-danger;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
  
  @include when(required) {
    .vc-form-item__label:before {
      content: '*';
      color: $--color-danger;
      margin-right: 4px;
    }
  }
  
  @include when(error) {
    .vc-input__inner,
    .vc-textarea__inner {
      border-color: $--color-danger;
    }
  }
}

.vc-zoom-in-top-enter-active,
.vc-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.vc-zoom-in-top-enter-from,
.vc-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>

