<template>
  <div :class="bem.e('panel')">
    <div :class="bem.e('panel-header')">
      <label :class="bem.e('panel-header-checkbox')">
        <input
          type="checkbox"
          :checked="isAllChecked"
          :indeterminate="isIndeterminate"
          :disabled="!selectableItemCount"
          @change="handleCheckAll"
        />
        <span>{{ title }}</span>
      </label>
      <span :class="bem.e('panel-count')">{{ checkedCount }} / {{ total }}</span>
    </div>

    <div v-if="filterable" :class="bem.e('panel-filter')">
      <input
        type="text"
        :class="bem.e('panel-filter-input')"
        :placeholder="filterPlaceholder"
        :value="filter"
        @input="handleQueryChange"
      />
    </div>

    <div :class="bem.e('panel-body')">
      <ul v-if="data.length" :class="bem.e('panel-list')">
        <li
          v-for="item in data"
          :key="item.key"
          :class="[
            bem.e('panel-item'),
            {
              'is-disabled': item.disabled,
              'is-checked': checkedKeySet.has(item.key)
            }
          ]"
          @click="toggleItem(item)"
        >
          <label>
            <input
              type="checkbox"
              :checked="checkedKeySet.has(item.key)"
              :disabled="item.disabled"
              @change.stop="handleItemCheck(item, $event)"
            />
            <span>{{ item.label }}</span>
          </label>
        </li>
      </ul>
      <div v-else :class="bem.e('panel-empty')">
        <slot name="empty">暂无数据</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import type { TransferDataItem } from './types'

const bem = createNamespace('transfer')

interface Props {
  title: string
  data: TransferDataItem[]
  total: number
  checkedKeys: (string | number)[]
  checkedCount: number
  filterable: boolean
  filterPlaceholder: string
  filter: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'query-change', value: string): void
  (e: 'check', key: string | number, checked: boolean): void
  (e: 'check-all', checked: boolean): void
}>()

const checkedKeySet = computed(() => new Set(props.checkedKeys))

const selectableItemCount = computed(() => props.data.filter(item => !item.disabled).length)

const isAllChecked = computed(() => {
  if (!selectableItemCount.value) return false
  return props.data
    .filter(item => !item.disabled)
    .every(item => checkedKeySet.value.has(item.key))
})

const isIndeterminate = computed(() => {
  if (!selectableItemCount.value) return false
  const hasChecked = props.data.some(item => !item.disabled && checkedKeySet.value.has(item.key))
  return hasChecked && !isAllChecked.value
})

const handleQueryChange = (event: Event) => {
  emit('query-change', (event.target as HTMLInputElement).value)
}

const handleItemCheck = (item: TransferDataItem, event: Event) => {
  if (item.disabled) return
  const checked = (event.target as HTMLInputElement).checked
  emit('check', item.key, checked)
}

const toggleItem = (item: TransferDataItem) => {
  if (item.disabled) return
  const checked = checkedKeySet.value.has(item.key)
  emit('check', item.key, !checked)
}

const handleCheckAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('check-all', checked)
}
</script>

