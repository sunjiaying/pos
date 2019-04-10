import Vue from 'vue';
import App from './App.vue';
import { router } from './router';

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});

Vue.prototype.sleep = function(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
