import Vue from 'vue';
import Vuex from 'vuex';
import lxlVuex from './modules/lxlVuex'
Vue.use(Vuex);
export default new Vuex.Store({
       modules:{
             lxlVuex
       }
})