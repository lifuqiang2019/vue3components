import type { App } from 'vue'
import { VcIcon } from './icon'
import { VcButton } from './button'
import { VcRow } from './row'
import { VcCol } from './col'
import { VcCheckbox, VcCheckboxGroup } from './checkbox'
import { VcInput } from './input'
import { VcForm, VcFormItem } from './form'
import { VcTransfer } from './transfer'
import { VcCollapse, VcCollapseItem } from './collapse'
import { VcInfiniteScroll } from './infinite-scroll'

const plugins = [
  VcIcon,
  VcButton,
  VcRow,
  VcCol,
  VcCheckbox,
  VcCheckboxGroup,
  VcInput,
  VcForm,
  VcFormItem,
  VcTransfer,
  VcCollapse,
  VcCollapseItem,
  VcInfiniteScroll
]

const install = (app: App) => {
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}

export {
  VcIcon,
  VcButton,
  VcRow,
  VcCol,
  VcCheckbox,
  VcCheckboxGroup,
  VcInput,
  VcForm,
  VcFormItem,
  VcTransfer,
  VcCollapse,
  VcCollapseItem,
  VcInfiniteScroll
}

export default {
  install
}

