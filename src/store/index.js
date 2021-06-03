import Vue from "vue";
import Vuex from "vuex";

import { user } from "./modules/user.module";
import { alert } from "./modules/alert.module";
import { product } from "./modules/product.module";
import { basket } from "./modules/basket.module";

Vue.use(Vuex);

const state = {};

export const getters = {};

export const mutations = {};

// export default new Vuex.Store({
//   state: {
//     isLoggedIn: false,
//     isAdmin: false,
//   },
//   mutations: {},
//   actions: {},
//   modules: {},
// });
