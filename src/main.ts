import { createApp } from 'vue'
import App from './App.vue'
import './service'
import router from './router'
import store from './store'
import { setupStore } from './store'

import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(router)

setupStore()

app.mount('#app')
