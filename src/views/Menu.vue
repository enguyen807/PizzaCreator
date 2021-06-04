<template>
  <div class="menu_wrapper">
    <!-- Menu -->
    <v-card class="menu">
      <v-card-title class="text-h4">~ Authentic handmade pizza ~</v-card-title>
      <div class="card_wrapper">
        <div v-for="(category, index) in Object.keys(categories)" :key="index">
          <v-card-subtitle
            class="text-h5 font-weight-bold secondary--text text-uppercase"
            >{{ category }}</v-card-subtitle
          >
          <v-card-text>
            <table
              v-for="(item, innerIndex) in categories[category]"
              :key="innerIndex"
            >
              <tbody>
                <tr>
                  <td>
                    <span class="font-weight-bold text-h6"
                      >~ {{ item.name }} ~</span
                    >
                  </td>
                </tr>
                <tr>
                  <td>
                    <small>{{ item.description }}</small>
                  </td>
                </tr>
                <tr v-for="(option, index) in item.options" :key="index">
                  <td>{{ option.size }}"</td>
                  <td>${{ option.price }}</td>
                  <td>
                    <v-btn
                      x-small
                      color="accent"
                      @click="handleAddPizzaToBasket(item, option)"
                    >
                      +
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card-text>
          <v-divider />
        </div>
      </div>
    </v-card>
    <!-- Basket -->
    <v-card class="basket">
      <v-card-title class="text-h4">~ Basket ~</v-card-title>
      <v-card-text class="overflow-y-auto">
        <div v-if="basket.length > 0" class="basket-wrapper">
          <table style="width: 100%">
            <tbody v-for="(item, index) in basket" :key="index">
              <tr>
                <td class="font-weight-bold text-h6">{{ item.name }}</td>
              </tr>
              <tr>
                <td>
                  <span class="font-weight-bold">Size: </span>{{ item.size }}"
                </td>
              </tr>
              <tr>
                <td>
                  <span class="font-weight-bold">Price: </span>
                  <span class="text-subtitle-2 primary--text"
                    >${{ (item.price * item.quantity).toFixed(2) }}</span
                  >
                </td>
              </tr>
              <tr>
                <td>
                  <v-btn
                    outlined
                    x-small
                    @click="handleRemovePizzaFromBasket(item)"
                  >
                    &#8722;
                  </v-btn>
                  <span class="mx-2">{{ item.quantity }}</span>
                  <v-btn x-small outlined @click="handleAddPizzaToBasket(item)">
                    &#43;
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td><v-divider class="mt-1" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          {{ basketText }}
        </div>
      </v-card-text>
      <v-card-actions v-if="basket.length > 0">
        <div class="order_section">
          <p class="mt-1 font-weight-bold text-h6">
            Order total: ${{ basketTotalCost }}
          </p>
          <v-btn medium class="accent">Place Order</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Menu",
  data() {
    return {
      basketText: "Your basket is empty",
      getMenuItems: [
        {
          name: "Margherita",
          description: "A delicious tomato based pizza topped with mozzarella",
          category: "vegetarian",
          options: [
            {
              size: 9,
              price: 6.95,
            },
            {
              size: 12,
              price: 10.95,
            },
          ],
        },
        {
          name: "Pepperoni",
          description:
            "A delicious tomato based pizza topped with mozzarella and pepperoni",
          category: "meat",
          options: [
            {
              size: 9,
              price: 7.95,
            },
            {
              size: 12,
              price: 12.95,
            },
          ],
        },
        {
          name: "Ham and Pineapple",
          description:
            "A delicious tomato based pizza topped with mozzarella, ham and pineapple",
          category: "meat",
          options: [
            {
              size: 9,
              price: 7.95,
            },
            {
              size: 12,
              price: 12.95,
            },
          ],
        },
        {
          name: "Spinach Artichoke Pizza",
          description:
            "The ultimate vegan comfort food! A delicious vegan spinach artichoke pizza.",
          category: "vegan",
          options: [
            {
              size: 9,
              price: 7.95,
            },
            {
              size: 12,
              price: 12.95,
            },
          ],
        },
        {
          name: "Vegan Hawaiian BBQ Pizza",
          description:
            "Sweet, spicy, and smoky pizza topped with tofu bacon and pineapple.",
          category: "vegan",
          options: [
            {
              size: 9,
              price: 7.95,
            },
            {
              size: 12,
              price: 12.95,
            },
          ],
        },
      ],
    };
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
    ...mapGetters("basket", ["basketTotalCost"]),
    categories() {
      return this.getMenuItems.reduce((acc, curr) => {
        acc[curr.category] = acc[curr.category] || [];
        acc[curr.category].push(curr);
        return acc;
      }, {});
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}

.menu_wrapper {
  display: flex;
  flex-direction: column;
}

.menu,
.basket {
  background: #f1e6da;
  border-radius: 3px;
  height: 100vh;
  margin: 10px;
  padding: 10px;
}

.basket-wrapper {
  max-height: 68vh;
}

.menu .card_wrapper {
  height: 80vh;
  overflow-y: auto;
}

.basket .v-card__text {
  overflow-y: auto;
}

.btn_green {
  background: palegreen;
  color: black;
  cursor: pointer;
}

@media screen and (min-width: 900px) {
  .menu_wrapper {
    flex-direction: row;
    justify-content: space-between;
  }

  .menu {
    width: 65vw;
  }

  .basket {
    width: 35vw;
  }
}
</style>