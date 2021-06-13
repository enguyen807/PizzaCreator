// Handles product CRUD
import firebase from "firebase/app";
import { dbMenuRef } from "@/firebase.js";

const state = {
  pizzas: [],
};

const getters = {
  getPizzaById: (state) => (id) => {
    return state.pizzas.find((pizza) => pizza.id === id);
  },
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
  DELETE_PIZZA(state, index) {
    state.pizzas.splice(index, 1);
  },
  ADD_OPTION(state, { index, pizzaOption }) {
    state.pizzas[index].options.push(pizzaOption);
  },
  DELETE_OPTION(state, { index, optionIndex }) {
    state.pizzas[index].options.splice(optionIndex, 1);
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
      const docId = await dbMenuRef.doc().id;
      const { name, description, category, size, price, times_ordered } =
        payload;
      const pizza = {
        id: docId,
        name: name,
        description: description,
        category: category,
        options: [],
      };
      pizza.options.push({
        size: size,
        price: +price,
        times_ordered: times_ordered,
      });
      await dbMenuRef.doc(docId).set(pizza);
      commit("CREATE_PIZZA", pizza);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  },
  async deletePizza({ commit, state }, payload) {
    try {
      const { id } = payload;
      const index = state.pizzas.findIndex((pza) => pza.id === id);
      await dbMenuRef.doc(id).delete();
      commit("DELETE_PIZZA", index);
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  },
  async addOption({ commit, state }, payload) {
    try {
      const { size, price, times_ordered, id } = payload;
      const pizzaOption = {
        size: size,
        price: price,
        times_ordered: times_ordered,
      };

      await dbMenuRef.doc(id).update({
        options: firebase.firestore.FieldValue.arrayUnion(pizzaOption),
      });

      const index = state.pizzas.findIndex((pza) => pza.id === id);

      commit("ADD_OPTION", { index, pizzaOption });
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  },
  async deleteOption({ commit, state }, payload) {
    try {
      const { size, price, times_ordered, id } = payload;
      const pizzaOption = {
        size: size,
        price: price,
        times_ordered: times_ordered,
      };

      const index = state.pizzas.findIndex((pza) => pza.id === id);
      const optionIndex = state.pizzas[index].options.findIndex(
        (pza) => pza.size === size
      );

      if (state.pizzas[index].options.length <= 1) {
        console.log("less than 1");
        return;
      }

      await dbMenuRef.doc(id).update({
        options: firebase.firestore.FieldValue.arrayRemove(pizzaOption),
      });

      commit("DELETE_OPTION", { index, optionIndex });
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
