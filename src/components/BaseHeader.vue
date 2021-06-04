<template>
  <div>
    <BaseToolbar
      @toggle-drawer="handleDrawer"
      @remove-pizza="handleRemovePizzaFromBasket"
      @add-pizza="handleAddPizzaToBasket"
      :is-mobile="isMobile"
      :basket="basket"
      :totalCost="basketTotalCost"
      :totalQuantity="basketTotalQuantity"
    >
      <template #toolbar-items>
        <v-btn to="/" text active-class="primary"> Home </v-btn>
        <v-btn to="/menu" text active-class="primary"> Menu </v-btn>
        <v-btn to="/contact" text active-class="primary"> Contact </v-btn>
        <v-btn to="/about" text active-class="primary"> About </v-btn>
      </template>
    </BaseToolbar>
  </div>
</template>

<script>
import BaseToolbar from "@/components/BaseToolbar/BaseToolbar";
// import BaseNavigationDrawer from "@/components/BaseNavigationDrawer/BaseNavigationDrawer";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  components: {
    BaseToolbar,
    // BaseNavigationDrawer,
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    ...mapActions("basket", ["addToBasket", "removeFromBasket"]),
    handleAddPizzaToBasket(item, option) {
      console.log(item);
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
    handleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    ...mapState("basket", ["basket"]),
    ...mapGetters("basket", ["basketTotalQuantity", "basketTotalCost"]),
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
  },
};
</script>

<style scoped>
</style>