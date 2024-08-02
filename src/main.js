import './assets/main.css'
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './includes/firebase';
import { auth } from './includes/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import App from './App.vue'
import router from './router'
import VeeValidatePlagin from './includes/validation'


let app
onAuthStateChanged(auth, ()=>{
  if(!app){
    app = createApp(App)
    app.use(createPinia())
    app.use(router);
    app.use(VeeValidatePlagin)
    
    app.mount('#app')
  }

})
