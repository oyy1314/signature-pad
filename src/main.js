import App from './App.vue'
import { createApp } from 'vue'
import { Popup, Button } from 'vant'
import './utils/rem'

const app = createApp(App)

import signature from './components/index'

app.use(Popup).use(Button).use(signature).mount('#app')

