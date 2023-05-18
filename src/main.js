import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from '@/plugins/axiosInstance'
import store from '@/store/index'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$axios=axios;
app.config.globalProperties.$store=store;
app.use(store)

router.isReady().then(() => app.mount('#app'))
