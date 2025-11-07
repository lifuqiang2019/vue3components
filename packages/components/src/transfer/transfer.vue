<template>
  <div :class="bem.b()">
    <TransferPanel
      :title="titles[0]"
      :data="filteredLeftData"
      :total="leftData.length"
      :checked-keys="leftChecked"
      :checked-count="leftCheckedCount"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :filter="leftQuery"
      @query-change="handleLeftQueryChange"
      @check="handleLeftItemCheck"
      @check-all="handleLeftCheckAll"
    />

    <div :class="bem.e('buttons')">
      <button
        type="button"
        :class="[
          bem.e('button'),
          {
            'is-disabled': !canMoveToRight
          }
        ]"
        :disabled="!canMoveToRight"
        @click="moveToRight"
      >
        <span>{{ buttonTexts[0] || '>' }}</span>
      </button>
      <button
        type="button"
        :class="[
          bem.e('button'),
          {
            'is-disabled': !canMoveToLeft
          }
        ]"
        :disabled="!canMoveToLeft"
        @click="moveToLeft"
      >
        <span>{{ buttonTexts[1] || '<' }}</span>
      </button>
    </div>

    <TransferPanel
      :title="titles[1]"
      :data="filteredRightData"
      :total="rightData.length"
      :checked-keys="rightChecked"
      :checked-count="rightCheckedCount"
      :filterable="filterable"
      :filter-placeholder="filterPlaceholder"
      :filter="rightQuery"
      @query-change="handleRightQueryChange"
      @check="handleRightItemCheck"
      @check-all="handleRightCheckAll"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { createNamespace } from '@vue3-components/utils'
import { transferProps, type TransferEmits, type TransferDataItem } from './types'
import TransferPanel from './transfer-panel.vue'

const bem = createNamespace('transfer')

type TransferKey = string | number

defineOptions({
  name: 'VcTransfer'
})

const props = defineProps(transferProps)

const emit = defineEmits<TransferEmits>()

const leftQuery = ref('')
const rightQuery = ref('')
const leftChecked = ref<TransferKey[]>([])
const rightChecked = ref<TransferKey[]>([])

const dataMap = computed(() => {
  const map = new Map<TransferKey, TransferDataItem>()
  props.data.forEach(item => {
    map.set(item.key, item)
  })
  return map
})

const targetKeySet = computed(() => new Set(props.modelValue))

const leftData = computed(() => props.data.filter(item => !targetKeySet.value.has(item.key)))

const rightData = computed(() => {
  return props.modelValue
    .map(key => dataMap.value.get(key))
    .filter((item): item is TransferDataItem => Boolean(item))
})

const leftKeySet = computed(() => new Set(leftData.value.map(item => item.key)))
const rightKeySet = computed(() => new Set(rightData.value.map(item => item.key)))

const leftCheckedCount = computed(() => leftChecked.value.filter(key => leftKeySet.value.has(key)).length)
const rightCheckedCount = computed(() => rightChecked.value.filter(key => rightKeySet.value.has(key)).length)

const filterMethod = (item: TransferDataItem, query: string) => {
  if (!query) return true
  return item.label.toLowerCase().includes(query.trim().toLowerCase())
}

const filteredLeftData = computed(() => leftData.value.filter(item => filterMethod(item, leftQuery.value)))
const filteredRightData = computed(() => rightData.value.filter(item => filterMethod(item, rightQuery.value)))

const canMoveToRight = computed(() =>
  leftChecked.value.some(key => {
    const item = dataMap.value.get(key)
    return item && !item.disabled
  })
)

const canMoveToLeft = computed(() =>
  rightChecked.value.some(key => {
    const item = dataMap.value.get(key)
    return item && !item.disabled
  })
)

const sanitizeChecked = () => {
  const leftKeys = new Set(leftData.value.map(item => item.key))
  leftChecked.value = leftChecked.value.filter(key => leftKeys.has(key))

  const rightKeys = new Set(rightData.value.map(item => item.key))
  rightChecked.value = rightChecked.value.filter(key => rightKeys.has(key))
}

watch(
  () => props.modelValue,
  () => {
    sanitizeChecked()
  },
  { immediate: true, deep: true }
)

watch(
  () => props.data,
  () => {
    sanitizeChecked()
  },
  { deep: true }
)

const updateValue = (newValue: TransferKey[], direction: 'left' | 'right', movedKeys: TransferKey[]) => {
  emit('update:modelValue', newValue)
  emit('change', newValue, direction, movedKeys)
}

const moveToRight = () => {
  const movedKeys = leftChecked.value.filter(key => {
    const item = dataMap.value.get(key)
    return item && !item.disabled
  })

  if (!movedKeys.length) return

  let newValue: TransferKey[]

  switch (props.targetOrder) {
    case 'push': {
      const current = props.modelValue.slice()
      movedKeys.forEach(key => {
        if (!current.includes(key)) {
          current.push(key)
        }
      })
      newValue = current
      break
    }
    case 'unshift': {
      const current = props.modelValue.slice()
      const uniqueKeys = movedKeys.filter(key => !current.includes(key))
      newValue = uniqueKeys.concat(current)
      break
    }
    case 'original':
    default: {
      const combined = new Set<TransferKey>([...props.modelValue, ...movedKeys])
      newValue = props.data
        .map(item => item.key)
        .filter(key => combined.has(key))
      break
    }
  }

  updateValue(newValue, 'right', movedKeys)
  leftChecked.value = []
}

const moveToLeft = () => {
  const movedKeys = rightChecked.value.filter(key => {
    const item = dataMap.value.get(key)
    return item && !item.disabled
  })

  if (!movedKeys.length) return

  const newValue = props.modelValue.filter(key => !movedKeys.includes(key))
  updateValue(newValue, 'left', movedKeys)
  rightChecked.value = []
}

const handleLeftQueryChange = (value: string) => {
  leftQuery.value = value
}

const handleRightQueryChange = (value: string) => {
  rightQuery.value = value
}

const handleLeftItemCheck = (key: TransferKey, checked: boolean) => {
  const item = dataMap.value.get(key)
  if (!item || item.disabled) return

  const set = new Set(leftChecked.value)
  if (checked) {
    set.add(key)
  } else {
    set.delete(key)
  }
  const result = Array.from(set)
  leftChecked.value = result
  emit('left-check-change', result, [key])
}

const handleRightItemCheck = (key: TransferKey, checked: boolean) => {
  const item = dataMap.value.get(key)
  if (!item || item.disabled) return

  const set = new Set(rightChecked.value)
  if (checked) {
    set.add(key)
  } else {
    set.delete(key)
  }
  const result = Array.from(set)
  rightChecked.value = result
  emit('right-check-change', result, [key])
}

const handleLeftCheckAll = (checked: boolean) => {
  const keys = filteredLeftData.value
    .filter(item => !item.disabled)
    .map(item => item.key)

  if (!keys.length) return

  if (checked) {
    const set = new Set([...leftChecked.value, ...keys])
    const result = Array.from(set)
    leftChecked.value = result
    emit('left-check-change', result, keys)
  } else {
    const result = leftChecked.value.filter(key => !keys.includes(key))
    leftChecked.value = result
    emit('left-check-change', result, keys)
  }
}

const handleRightCheckAll = (checked: boolean) => {
  const keys = filteredRightData.value
    .filter(item => !item.disabled)
    .map(item => item.key)

  if (!keys.length) return

  if (checked) {
    const set = new Set([...rightChecked.value, ...keys])
    const result = Array.from(set)
    rightChecked.value = result
    emit('right-check-change', result, keys)
  } else {
    const result = rightChecked.value.filter(key => !keys.includes(key))
    rightChecked.value = result
    emit('right-check-change', result, keys)
  }
}

const buttonTexts = computed(() => props.buttonTexts || ['', ''])
const titles = computed(() => props.titles || ['Source', 'Target'])

const filterable = computed(() => props.filterable)
const filterPlaceholder = computed(() => props.filterPlaceholder)
</script>

<style lang="scss">
@import "../styles/mixin.scss";
@import "../styles/common/var.scss";

@include b(transfer) {
  display: flex;
  align-items: center;
  color: #606266;

  @include e(panel) {
    width: 240px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    height: 320px;
    box-sizing: border-box;
  }

  @include e(panel-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    height: 40px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    font-size: 14px;
  }

  @include e(panel-header-checkbox) {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }

  @include e(panel-count) {
    color: #909399;
    font-size: 12px;
  }

  @include e(panel-filter) {
    padding: 10px 12px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  @include e(panel-filter-input) {
    width: 100%;
    padding: 6px 10px;
    font-size: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    outline: none;

    &:focus {
      border-color: $--color-primary;
    }
  }

  @include e(panel-body) {
    flex: 1;
    overflow: auto;
  }

  @include e(panel-list) {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @include e(panel-item) {
    padding: 8px 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;

    &.is-disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &:not(.is-disabled):hover {
      background-color: #f5f7fa;
    }

    input {
      margin-right: 8px;
    }
  }

  @include e(panel-empty) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #909399;
    font-size: 12px;
  }

  @include e(buttons) {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    gap: 12px;
  }

  @include e(button) {
    min-width: 40px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    background-color: #f5f7fa;
    color: #606266;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: $--color-primary;
      color: $--color-primary;
    }

    &.is-disabled,
    &.is-disabled:hover {
      cursor: not-allowed;
      color: #c0c4cc;
      border-color: #e4e7ed;
      background-color: #f5f7fa;
    }
  }
}
</style>

