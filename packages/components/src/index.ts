import type { App } from 'vue'
import { VcIcon } from './icon'

const components = [VcIcon]

const install = (app: App) => {
  components.forEach(component => {
    app.use(component)
  })
}

export { VcIcon }

export default {
  install
}

