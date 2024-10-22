import { createApp } from 'vue'
import { store } from './stores/index.ts'

import App from './App.vue'
// import router from './router/index'

const app = createApp(App)

app.use(store)
// app.use(router)

app.mount('#app')
