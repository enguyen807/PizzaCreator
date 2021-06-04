<template>
  <v-app-bar app light elevation="20">
    <v-img
      alt="Pizza Planet Logo"
      class="shrink mr-2"
      contain
      src="@/assets/images/pizza (1).png"
      transition="scale-transition"
      width="40"
      height="40"
    />
    <v-spacer />

    <v-btn to="/" text active-class="primary"> Home </v-btn>
    <v-btn to="/menu" text active-class="primary"> Menu </v-btn>
    <v-btn to="/contact" text active-class="primary"> Contact </v-btn>
    <v-btn to="/about" text active-class="primary"> About </v-btn>

    <v-spacer />

    <v-btn to="/login" text active-class="primary" class=""> Login </v-btn>
    <v-btn to="/register" text active-class="primary"> Register </v-btn>
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-2" text icon color="primary" v-bind="attrs" v-on="on">
          <v-icon>mdi-cart</v-icon>
          <transition name="pop">
            <span
              class="cart-notification accent white--text"
              v-if="basket.length > 0"
              >{{ basketTotalQuantity }}</span
            >
          </transition>
        </v-btn>
      </template>
      <v-container class="pa-0" v-if="basket.length > 0">
        <v-row dense>
          <v-col cols="12">
            <v-card v-for="(item, index) in basket" :key="index" width="300px">
              <div class="d-flex">
                <v-card-title class="text-h6"> {{ item.name }} </v-card-title>
                <v-spacer />
                <v-card-title class="text-h6"
                  >${{ (item.price * item.quantity).toFixed(2) }}</v-card-title
                >
              </div>
              <v-card-subtitle class="py-0"
                ><span class="font-weight-bold">Size: </span
                >{{ item.size }}"</v-card-subtitle
              >

              <v-card-actions class="pa-4">
                <v-btn
                  icon
                  outlined
                  x-small
                  @click="handleRemovePizzaFromBasket(item)"
                >
                  &#8722;
                </v-btn>
                <span class="mx-2">{{ item.quantity }}</span>
                <v-btn
                  icon
                  x-small
                  outlined
                  @click="handleAddPizzaToBasket(item)"
                >
                  &#43;
                </v-btn>
              </v-card-actions>
            </v-card>
            <div class="order_section">
              <v-btn medium class="accent font-weight-bold text-h6" block
                >Place Order ${{ basketTotalCost }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  data() {
    return {};
  },
  methods: {
    ...mapActions("basket", ["addToBasket", "removeFromBasket"]),
    handleAddPizzaToBasket(item, option) {
      if (!option) {
        const data = item;
        this.addToBasket({ data });
        return;
      }
      const data = {
        name: item.name,
        price: option.price,
        size: option.size,
        quantity: 1,
      };
      this.addToBasket({ data });
    },
    handleRemovePizzaFromBasket(item) {
      this.removeFromBasket({ item });
    },
  },
  computed: {
    ...mapState("basket", ["basket"]),
    ...mapGetters("basket", ["basketTotalQuantity", "basketTotalCost"]),
  },
};
</script>

<style scoped>
.v-sheet.v-app-bar.v-toolbar {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.v-toolbar__title {
  font-size: 2rem !important;
}

.cart-notification {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  z-index: 2;
  position: absolute;
  right: 3px;
  bottom: 10px;
}

.pop-enter-active {
  animation: pop-in 0.3s linear;
}

.pop-leave-active {
  animation: pop-in 0.3s linear reverse;
}

@keyframes pop-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>