import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './main.css'
import App from './App.vue'
import router from './router'
import { Button, Card, Drawer, Modal, Input, Segmented } from 'ant-design-vue'

// TODO: should I optimize use of antd?
const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(Button)
  .use(Modal)
  .use(Card)
  .use(Drawer)
  .use(Input)
  .use(Segmented)
  .mount('#app')
