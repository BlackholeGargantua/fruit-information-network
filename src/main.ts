import { createApp } from 'vue'
import App from './App.vue'
// import service from './service'
import './service'
import router from './router'
import store from './store'

import 'element-plus/dist/index.css'

const app = createApp(App)
// app.use(service)
app.use(store)
app.use(router)
app.mount('#app')
