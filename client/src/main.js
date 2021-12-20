import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSocketIO from 'vue-socket.io'

Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;


Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3002',
}))

new Vue({
  render: (h) => h(App),
}).$mount("#app");
