// Handles product CRUD
import firebase from "firebase/app";
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
          description: pizza.description,
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
  CREATE_PIZZA(state, pizza) {
    state.pizzas.push(pizza);
  },
  ADD_OPTION(state, { index, pizzaOption }) {
    state.pizzas[index].options.push(pizzaOption);
  },
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
  async createPizza({ commit }, payload) {
    try {
      const pizza = {
        id: "",
        name: payload.name,
        description: payload.description,
        category: payload.category,
        options: [],
      };
      pizza.options.push({
        size: payload.size,
        price: +payload.price,
        times_ordered: payload.times_ordered,
      });
      await dbMenuRef.add(pizza);
      commit("CREATE_PIZZA", pizza);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  },
  async addOption({ commit, state }, payload) {
    console.log(payload);
    try {
      const pizzaOption = {
        size: payload.size,
        price: payload.price,
        times_ordered: payload.times_ordered,
      };

      await dbMenuRef.doc(payload.id).update({
        options: firebase.firestore.FieldValue.arrayUnion(pizzaOption),
      });

      const index = state.pizzas.findIndex((pza) => pza.id === payload.id);

      commit("ADD_OPTION", { index, pizzaOption });
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
