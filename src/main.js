import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from "buefy"
import 'buefy/dist/buefy.css'
import './vee_validate';
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "G-G691BZ3LEV" }
});

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')