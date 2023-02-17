import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/antd.css';
import './assets/css/index.less'
import './assets/icon/icon.js'
import router from './router'
import App from './App'
import Antd from 'ant-design-vue'
import SvgIcon from '@/components/iconComponent/index'
// pinia持久化
import piniaPluginPersist from 'pinia-plugin-persist'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(router).use(Antd).use(pinia).component("SvgIcon", SvgIcon).mount('#app')