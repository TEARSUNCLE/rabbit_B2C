import { createApp } from 'vue'
import 'ant-design-vue/dist/antd.css';
import './assets/css/index.less'
import router from './router'
import App from './App'
import Antd from 'ant-design-vue'

const app = createApp(App)
app.use(router).use(Antd).mount('#app')