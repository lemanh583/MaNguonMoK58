import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSocketIO from 'vue-socket.io'
import router from './router'
import Vuex from 'vuex'
import store from "./store"
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

Vue.use(Vuex)
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3002/',
}))

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
