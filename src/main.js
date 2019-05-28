import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.config.productionTip = false
Vue.use(Vuetify,{
    iconfont: 'mdi' || 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(SuiVue);
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
