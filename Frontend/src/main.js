import { createApp } from 'vue';
import GAuth from 'vue3-google-oauth2';
import router from './router/router';
import store from './store/store';
import App from './App.vue';

const gAuthOptions = { clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID, scope: 'email', prompt: 'consent', fetch_basic_profile: true }
createApp(App)
  .use(GAuth, gAuthOptions)
  .use(store)
  .use(router)
  .mount('#app')
