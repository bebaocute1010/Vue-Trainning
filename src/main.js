import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from '@vuelidate/core'
import apiService from "./Services/ApiService";
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import mixin from '../Mixins/mixins'
import Vuex from 'vuex'
import storeConfig from "./store";
import vuetify from "./flugins/vuetify"

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(VueGoodTablePlugin)
Vue.use(apiService)
Vue.use(Vuex)

Vue.mixin(mixin)

Vue.config.productionTip = false
Vue.config.silent = true

const store = new Vuex.Store(storeConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: { App },
  template: '<App/>'
})
