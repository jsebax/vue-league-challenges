import Vue from "vue";
import { VueMaskDirective } from "v-mask";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.directive("mask", VueMaskDirective);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
