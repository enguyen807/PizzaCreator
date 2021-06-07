<template>
  <div class="admin_wrapper">
    <NewPizzaForm />
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card
            class="menu_wrapper"
            elevation="4"
          >
            <v-card-title>Menu:</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="pizzas"
                class="elevation-0"
              >
                <template #[`item.remove`]="{ item }">
                  <v-btn
                    small
                    class="red darken-1 white--text"
                    @click="remove(item)"
                  >
                    &times;
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NewPizzaForm from "@/components/PizzaForm/PizzaForm.vue";
import { firebaseAuth } from "@/firebase";

export default {
  name: "Admin",
  components: {
    NewPizzaForm,
  },
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Size", value: "size" },
        { text: "Price", value: "price" },
        { text: "Times Ordered", value: "times_ordered" },
        { text: "Remove from menu", value: "remove", sortable: false },
      ],
      pizzas: [
        {
          name: "Margherita",
          size: "9",
          price: "$6.95",
          times_ordered: "5",
        },
        {
          name: "Margherita",
          size: "12",
          price: "$10.95",
          times_ordered: "2",
        },
      ],
    };
  },
  methods: {
    async logOut() {
      try {
        await firebaseAuth.signOut();
      } catch (error) {
        alert(`error signing out, ${error}`);
      }
    },
    remove(item) {
      const index = this.pizzas.findIndex(
        (pizza) => pizza.name === item.name && pizza.size === item.size
      );
      console.log(index);
      this.pizzas.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.admin_wrapper {
  margin: 10px;
}

table {
  text-align: left;
}

.order_number th {
  background: #ddd;
}

.order_number button {
  margin: 0 10px;
}
</style>