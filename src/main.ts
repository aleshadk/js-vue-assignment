import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TextElementComponent from './components/elements/text-element/TextElementComponent.vue'

import App from './App.vue'
import router from './router'




const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('TextElementComponent', TextElementComponent)

app.mount('#app')
