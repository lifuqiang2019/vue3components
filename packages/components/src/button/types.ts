import { ExtractPropTypes, PropType } from 'vue'

export const buttonProps = {
  type: {
    type: String as PropType<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'>,
    default: 'default'
  },
  size: {
    type: String as PropType<'default' | 'medium' | 'small' | 'mini'>,
    default: 'default'
  },
  icon: {
    type: String,
    default: ''
  },
  nativeType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export interface ButtonEmits {
  (e: 'click', evt: MouseEvent): void
}

