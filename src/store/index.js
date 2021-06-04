import Vue from "vue";
import Vuex from "vuex";

import { user } from "./modules/user.module";
import { alert } from "./modules/alert.module";
import { product } from "./modules/product.module";
import { basket } from "./modules/basket.module";

Vue.use(Vuex);

const state = {
  isLoggedIn: false,
  isAdmin: false,
};

const getters = {};

const mutations = {};

const actions = {};

const modules = {
  user,
  alert,
  product,
  basket,
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
