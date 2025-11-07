import { withInstall } from '@vue3-components/utils'
import Form from './form.vue'
import FormItem from './form-item.vue'

export const VcForm = withInstall(Form)
export const VcFormItem = withInstall(FormItem)

export default VcForm

export * from './types'

