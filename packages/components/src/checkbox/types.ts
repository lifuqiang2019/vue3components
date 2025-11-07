import { ExtractPropTypes } from 'vue'

export const checkboxProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  label: {
    type: [String, Number, Boolean]
  },
  disabled: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  }
}

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean | string | number): void
  (e: 'change', value: boolean): void
}

export const checkboxGroupProps = {
  modelValue: {
    type: Array as () => any[],
    default: () => []
  }
}

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export interface CheckboxGroupEmits {
  (e: 'update:modelValue', value: any[]): void
  (e: 'change', value: any[]): void
}

