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
app.mount('#app')

// axios.interceptors.request.use(function(config){
//     let token = window.localStorage.getItem('userToken');
//     token = eval('(' + token + ')');
//     // console.log(token)
//     if (token){
//         config.headers.token = token;    //将token放到请求头发送给服务器
//     }

//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });