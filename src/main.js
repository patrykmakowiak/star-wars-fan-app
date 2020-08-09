import Vue from "vue";
import App from "./App.vue";
import { Plugin } from "vue-fragment";
import Vuelidate from "vuelidate";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  Plugin,
  vuetify,
  Vuelidate,
  render: h => h(App)
}).$mount("#app");
