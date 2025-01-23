import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TextElementComponent from './components/elements/text-element/TextElementComponent.vue'
import './main.css'
import App from './App.vue'
import router from './router'
import { Button, Card, Modal } from 'ant-design-vue'

// TODO: should I optimize use of antd?
const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(Button)
  .use(Modal)
  .use(Card)
  .mount('#app')
