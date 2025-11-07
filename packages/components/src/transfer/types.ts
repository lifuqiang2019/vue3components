import { ExtractPropTypes } from 'vue'

export interface TransferDataItem {
  key: string | number
  label: string
  disabled?: boolean
}

export const transferProps = {
  modelValue: {
    type: Array as () => (string | number)[],
    default: () => []
  },
  data: {
    type: Array as () => TransferDataItem[],
    default: () => []
  },
  titles: {
    type: Array as () => [string, string],
    default: () => ['Source', 'Target']
  },
  buttonTexts: {
    type: Array as () => [string, string],
    default: () => ['', '']
  },
  filterable: {
    type: Boolean,
    default: false
  },
  filterPlaceholder: {
    type: String,
    default: 'Search'
  },
  targetOrder: {
    type: String as () => 'original' | 'push' | 'unshift',
    default: 'original'
  }
}

export type TransferProps = ExtractPropTypes<typeof transferProps>

export interface TransferEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[], direction: 'left' | 'right', movedKeys: (string | number)[]): void
  (e: 'left-check-change', value: (string | number)[], movedKeys: (string | number)[]): void
  (e: 'right-check-change', value: (string | number)[], movedKeys: (string | number)[]): void
}

