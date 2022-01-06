//引入Vue核心库
import Vue from "vue";
//引入Vuex
import Vuex from "vuex";
import moduleCart from "./cart.js";
import moduleUser from "./user.js";
//应用Vuex插件
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    m_cart: moduleCart,
    m_user: moduleUser,
  },
});

export default store;
