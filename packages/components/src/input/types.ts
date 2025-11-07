import { ExtractPropTypes, PropType } from 'vue'

export const inputProps = {
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String as PropType<'default' | 'medium' | 'small' | 'mini'>,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 2
  },
  autosize: {
    type: [Boolean, Object],
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  maxlength: {
    type: Number
  },
  minlength: {
    type: Number
  },
  showWordLimit: {
    type: Boolean,
    default: false
  }
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', evt: FocusEvent): void
  (e: 'blur', evt: FocusEvent): void
  (e: 'clear'): void
}

