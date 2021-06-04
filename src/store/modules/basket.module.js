// Handles Payment, and Ordering Product

const state = {
  basket: [],
};

const getters = {
  basketTotalCost: (state) => {
    if (basket.length === 0) return;
    const totalPrice = state.basket.reduce(
      (sum, basket) => sum + basket.price * basket.quantity,
      0
    );
    return totalPrice.toFixed(2);
  },
  basketTotalQuantity: (state) => {
    if (basket.length === 0) return;
    const totalQty = state.basket.reduce(
      (sum, basket) => sum + basket.quantity,
      0
    );
    return totalQty;
  },
};

const mutations = {
  ADD_TO_BASKET(state, item) {
    state.basket.push(item);
  },
  REMOVE_FROM_BASKET(state, item) {
    state.basket.splice(state.basket.indexOf(item), 1);
  },
  INCREASE_QTY(state, item) {
    item.quantity++;
  },
  DECREASE_QTY(state, item) {
    item.quantity--;
  },
};

const actions = {
  addToBasket({ commit, state }, { data }) {
    const pizzaExists = state.basket.find(
      (pizza) => pizza.name === data.name && pizza.size === data.size
    );

    if (pizzaExists) {
      // Call increase qty
      commit("INCREASE_QTY", pizzaExists);
      return;
    }

    commit("ADD_TO_BASKET", data);
  },
  removeFromBasket({ commit }, { item }) {
    commit("DECREASE_QTY", item);
    if (item.quantity === 0) {
      commit("REMOVE_FROM_BASKET", item);
    }
  },
};

export const basket = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
