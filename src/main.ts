import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css';
import './assets/css/index.less'
import './assets/icon/icon.js'
import router from './router'
import App from './App'
import Antd from 'ant-design-vue'
import SvgIcon from '@/components/iconComponent/index'

const app = createApp(App)
app.use(router).use(Antd).component("SvgIcon", SvgIcon).mount('#app')