import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TextElementComponent from './components/elements/text-element/TextElementComponent.vue'
import './main.css'
import App from './App.vue'
import router from './router'
import { Button } from 'ant-design-vue'




const app = createApp(App)
  .use(createPinia())
  .use(router)
  .component('TextElementComponent', TextElementComponent)
  .use(Button)
  .mount('#app')
