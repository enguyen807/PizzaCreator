<template>
  <div class="admin_wrapper d-sm-flex justify-sm-space-around">
    <NewPizzaForm />
    <v-card class="menu_wrapper" elevation="3">
      <v-card-title>Menu:</v-card-title>
      <v-card-text>
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Times Ordered</th>
                <th>Remove from menu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Margherita</td>
                <td>9"</td>
                <td>$6.95</td>
                <td>5</td>
                <td>
                  <v-btn small class="red darken-1 white--text">&times;</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
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
  methods: {
    async logOut() {
      try {
        await firebaseAuth.signOut();
      } catch (error) {
        alert(`error signing out, ${error}`);
      }
    },
  },
};
</script>

<style scoped>
.admin_wrapper {
  margin: 10px;
}

.current_user_wrapper,
.order_wrapper,
.menu_wrapper {
  padding: 12px;
  width: 100%;
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