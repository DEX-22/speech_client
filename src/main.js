import { createApp } from 'vue' 
import App from './App.vue'
import './style.css'

import 'tailwindcss/tailwind.css'

import { TroisJSVuePlugin } from 'troisjs';


createApp(App)
.use(TroisJSVuePlugin)
.mount('#app')
