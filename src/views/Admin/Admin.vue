<template>
  <div class="admin_wrapper">
    <PizzaForm />
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card class="menu_wrapper" elevation="4">
            <v-card-title>Menu:</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="products"
                class="elevation-0"
                group-by="name"
                item-key="name + size"
              >
                <template #[`group.header`]="{ group, items, isOpen, toggle }">
                  <td colspan="6">
                    <v-btn icon small @click="toggle">
                      <v-icon v-if="isOpen"> mdi-minus </v-icon>
                      <v-icon v-else> mdi-plus </v-icon>
                    </v-btn>
                    Category: {{ group }} ({{ items.length }} in the group)
                  </td>
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
import PizzaForm from "@/components/PizzaForm/PizzaForm.vue";
import { firebaseAuth } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  name: "Admin",
  components: {
    PizzaForm,
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id" },
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Size", value: "size" },
        { text: "Price", value: "price" },
        { text: "Times Ordered", value: "times_ordered" },
      ],
    };
  },
  computed: {
    ...mapGetters("product", ["products"]),
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
      const index = this.products.findIndex(
        (pizza) => pizza.id === item.id && pizza.size === item.size
      );
      console.log(index);
      this.products.splice(index, 1);
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