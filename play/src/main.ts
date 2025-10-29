import { createApp } from 'vue'
import App from './App.vue'
import Vue3Components from '@vue3-components/components'

const app = createApp(App)
app.use(Vue3Components)
app.mount('#app')

