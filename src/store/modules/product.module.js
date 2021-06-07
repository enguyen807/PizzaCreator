// Handles product CRUD
import { dbMenuRef } from "@/firebase.js";

const state = {
  pizzas: [],
};

const getters = {
  products: (state) => {
    return state.pizzas
      .map((pizza) => {
        return pizza.options.map((p) => ({
          id: pizza.id,
          name: pizza.name,
          category: pizza.category,
          times_ordered: p.times_ordered,
          price: p.price,
          size: p.size,
        }));
      })
      .flat(2);
  },
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.pizzas = [...products];
  },
};

const actions = {
  async getPizzas({ dispatch, commit }) {
    try {
      const { docs } = await dbMenuRef.get();
      const products = docs.map((doc) => {
        const { id } = doc;
        const data = doc.data();
        return { id, ...data };
      });
      commit("SET_PRODUCTS", products);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  },
};

export const product = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
