<template>
  <div class="menu_wrapper">
    <!-- Menu -->
    <v-card class="menu">
      <v-card-title class="text-h5">
        ~ Authentic handmade pizza ~
      </v-card-title>
      <div class="card_wrapper">
        <div v-for="(category, index) in Object.keys(categories)" :key="index">
          <v-card-subtitle
            class="text-h6 font-weight-bold secondary--text text-uppercase"
          >
            {{ category }}
          </v-card-subtitle>
          <v-card-text>
            <div
              class="container container--fluid"
              v-for="(item, innerIndex) in categories[category]"
              :key="innerIndex"
            >
              <div class="font-weight-bold text-h6">~ {{ item.name }} ~</div>
              <div class="text-subtitle-2 mb-3">{{ item.description }}</div>
              <div
                class="row dense"
                v-for="(option, index) in item.options"
                :key="index"
              >
                <div class="col col-2">{{ option.size }}"</div>
                <div class="col col-4 text-right">${{ option.price }}</div>
                <div class="col col-3">
                  <v-btn
                    x-small
                    color="accent"
                    @click="handleAddPizzaToBasket(item, option)"
                  >
                    +
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-divider />
        </div>
      </div>
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
              price: 7.95,
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
              price: 10.95,
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
              price: 10.95,
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
              price: 10.95,
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
              price: 10.95,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState("basket", ["basket"]),
    ...mapState("product", ["pizzas"]),
    ...mapGetters("basket", ["basketTotalCost"]),
    categories() {
      const { pizzas } = this;
      return pizzas.reduce((acc, curr) => {
        acc[curr.category] = acc[curr.category] || [];
        acc[curr.category].push(curr);
        return acc;
      }, {});
    },
  },
  methods: {
    ...mapActions("basket", ["addToBasket", "removeFromBasket"]),
    handleAddPizzaToBasket(item, option = null) {
      const { name } = item;
      const { price, size } = option;
      const data = {
        name: name,
        price: price,
        size: size,
        quantity: 1,
      };
      this.addToBasket({ data });
    },
    handleRemovePizzaFromBasket(item) {
      this.removeFromBasket({ item });
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
  height: 85vh;
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
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>