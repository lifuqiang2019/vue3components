<template>
  <form :class="bem.b()" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive, computed } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { formProps, type FormContext } from './types'

const bem = createNamespace('form')

defineOptions({
  name: 'VcForm'
})

const props = defineProps(formProps)

const fields: any[] = reactive([])

const addField = (field: any) => {
  fields.push(field)
}

const removeField = (field: any) => {
  const index = fields.indexOf(field)
  if (index > -1) {
    fields.splice(index, 1)
  }
}

const validate = async (callback?: (valid: boolean, errors?: any) => void): Promise<boolean> => {
  let valid = true
  let errors: any = {}
  
  for (const field of fields) {
    try {
      await field.validate()
    } catch (error: any) {
      valid = false
      errors[field.prop] = error
    }
  }
  
  if (callback) {
    callback(valid, valid ? undefined : errors)
  }
  
  return valid
}

const validateField = (props: string | string[], callback?: (valid: boolean, errors?: any) => void) => {
  const propArray = Array.isArray(props) ? props : [props]
  const fieldsToValidate = fields.filter(field => propArray.includes(field.prop))
  
  if (fieldsToValidate.length === 0) {
    if (callback) callback(true)
    return
  }
  
  let valid = true
  let errors: any = {}
  let count = 0
  
  fieldsToValidate.forEach(async field => {
    try {
      await field.validate()
    } catch (error: any) {
      valid = false
      errors[field.prop] = error
    } finally {
      count++
      if (count === fieldsToValidate.length && callback) {
        callback(valid, valid ? undefined : errors)
      }
    }
  })
}

const resetFields = () => {
  fields.forEach(field => {
    field.resetField()
  })
}

const clearValidate = (props?: string | string[]) => {
  const propArray = props ? (Array.isArray(props) ? props : [props]) : []
  const fieldsToClear = propArray.length
    ? fields.filter(field => propArray.includes(field.prop))
    : fields
  
  fieldsToClear.forEach(field => {
    field.clearValidate()
  })
}

const formContext: FormContext = {
  ...props,
  addField,
  removeField
}

provide('form', formContext)

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate
})
</script>

<style lang="scss">
@import "../styles/mixin.scss";

@include b(form) {
  @include m(label-left) {
    .vc-form-item__label {
      text-align: left;
    }
  }
  
  @include m(label-top) {
    .vc-form-item__label {
      float: none;
      display: inline-block;
      text-align: left;
      padding: 0 0 10px 0;
    }
  }
  
  @include m(inline) {
    .vc-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
    }
    
    .vc-form-item__label {
      float: none;
      display: inline-block;
    }
    
    .vc-form-item__content {
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>

