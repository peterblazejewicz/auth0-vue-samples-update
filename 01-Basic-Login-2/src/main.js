import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';

import Home from './components/Home.vue';
import Public from './components/Public.vue';
import Private from './components/Private.vue';
import NotFound from './components/NotFound.vue';

global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.interceptors
  .push((request, next) => {
    request.headers
      .set('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
    next();
  });

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/public',
      component: Public
    }, {
      path: '/private',
      component: Private
    }, {
      path: '*',
      component: NotFound
    }
  ]
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
