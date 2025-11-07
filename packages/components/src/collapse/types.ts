import type { ExtractPropTypes, PropType, InjectionKey } from 'vue'

export type CollapseActiveName = string | number
export type CollapseModelValue = CollapseActiveName | CollapseActiveName[]

export const collapseProps = {
  accordion: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [Array, String, Number] as PropType<CollapseModelValue>,
    default: () => []
  }
}

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseItemProps = {
  name: {
    type: [String, Number] as PropType<CollapseActiveName>,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>

export interface CollapseContext {
  activeNames: () => CollapseActiveName[]
  toggleItem: (name: CollapseActiveName, disabled: boolean) => void
  accordion: () => boolean
}

export const collapseInjectionKey: InjectionKey<CollapseContext> = Symbol('VcCollapse')

export interface CollapseEmits {
  (e: 'update:modelValue', value: CollapseModelValue): void
  (e: 'change', value: CollapseModelValue): void
}


