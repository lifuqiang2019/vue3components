import { ExtractPropTypes, PropType } from 'vue'

export interface RuleItem {
  required?: boolean
  message?: string
  trigger?: string | string[]
  type?: string
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (rule: any, value: any, callback: (error?: string) => void) => void
  [key: string]: any
}

export const formProps = {
  model: {
    type: Object,
    default: () => ({})
  },
  rules: {
    type: Object as PropType<Record<string, RuleItem[]>>,
    default: () => ({})
  },
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'right'
  },
  labelWidth: {
    type: String,
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  inline: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  showMessage: {
    type: Boolean,
    default: true
  }
}

export type FormProps = ExtractPropTypes<typeof formProps>

export const formItemProps = {
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: String,
    default: ''
  },
  prop: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: undefined
  },
  rules: {
    type: [Object, Array] as PropType<RuleItem | RuleItem[]>,
    default: () => []
  },
  error: {
    type: String,
    default: ''
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  inlineMessage: {
    type: [String, Boolean],
    default: ''
  }
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export interface FormContext extends FormProps {
  addField?: (field: any) => void
  removeField?: (field: any) => void
}

