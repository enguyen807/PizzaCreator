<template>
  <div>
    <BaseToolbar
      :is-mobile="isMobile"
      :basket="basket"
      :total-cost="basketTotalCost"
      :total-quantity="basketTotalQuantity"
      @toggle-drawer="handleDrawer"
      @remove-pizza="handleRemovePizzaFromBasket"
      @add-pizza="handleAddPizzaToBasket"
    >
      <template #toolbar-items>
        <div v-show="!isMobile">
          <v-btn
            v-for="(link, index) in links"
            :key="index"
            :to="link['href']"
            text
            active-class="primary"
          >
            {{ link["title"] }}
          </v-btn>
        </div>
      </template>
    </BaseToolbar>
    <BaseNavigationDrawer v-model="drawer" :links="links" />
  </div>
</template>

<script>
import BaseToolbar from "@/components/BaseToolbar/BaseToolbar";
import BaseNavigationDrawer from "@/components/BaseNavigationDrawer/BaseNavigationDrawer";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeader",
  components: {
    BaseToolbar,
    BaseNavigationDrawer,
  },
  data() {
    return {
      drawer: false,
      links: [
        {
          title: "Home",
          icon: "mdi-home-city",
          href: "/",
        },
        {
          title: "Menu",
          icon: "mdi-silverware",
          href: "/menu",
        },
        {
          title: "Contact",
          icon: "mdi-card-account-mail-outline",
          href: "/contact",
        },
        {
          title: "About",
          icon: "mdi-help-box",
          href: "/about",
        },
      ],
    };
  },
  computed: {
    ...mapState("basket", ["basket"]),
    ...mapGetters("basket", ["basketTotalQuantity", "basketTotalCost"]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
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
};
</script>

<style scoped>
</style>