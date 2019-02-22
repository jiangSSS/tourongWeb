// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import 'babel-polyfill'
import Vue from 'vue'
if (Number.parseInt === undefined) Number.parseInt = window.parseInt;
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import {$axios} from './utils'
import store from './store'

import "normalize.css/normalize.css"
import "./style/index.scss"

import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
Vue.use(Share)
Vue.use(ElementUI);

import Login from './components/Login'
Vue.use(Login)

Array.prototype.indexOf = function(val) { 
  for (var i = 0; i < this.length; i++) { 
  if (this[i] == val) return i; 
  } 
  return -1; 
};
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
    this.splice(index, 1); 
    } 
};

import { emoji } from './utils/emoji.js'
Vue.prototype.emoji = emoji

Vue.config.productionTip = false

Vue.prototype.$axios = $axios;

// Vue.prototype.$url = 'http://192.168.4.11:8484'
Vue.prototype.$url = 'http://39.96.39.111:6022'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
