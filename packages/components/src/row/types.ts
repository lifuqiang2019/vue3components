import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'

export const rowProps = {
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String as PropType<'start' | 'end' | 'center' | 'space-around' | 'space-between'>,
    default: 'start'
  },
  align: {
    type: String as PropType<'top' | 'middle' | 'bottom'>,
    default: 'top'
  },
  tag: {
    type: String,
    default: 'div'
  }
}

export type RowProps = ExtractPropTypes<typeof rowProps>

export interface RowContext {
  gutter: Ref<number>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('VcRowContext')

