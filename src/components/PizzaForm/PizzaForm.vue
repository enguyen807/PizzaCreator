<template>
  <v-card class="pa-5">
    <v-card-title>Add New Pizza</v-card-title>
    <v-card-text>
      <v-form ref="pizzaForm" v-model="valid">
        <div class="form-group">
          <v-text-field
            id="name"
            v-model="pizza.name"
            type="text"
            label="Name"
            :rules="nameRules"
            placeholder="Eg. Margherita"
            required
          />
        </div>
        <div class="form-group">
          <v-textarea
            id="description"
            v-model="pizza.description"
            type="text"
            rows="3"
            label="Description"
            :rules="descriptionRules"
            placeholder="Eg. A delicious tomato based pizza topped with mozzarella"
            required
          />
        </div>
        <div class="form-group">
          <v-select
            :items="categories"
            v-model="pizza.category"
            label="Category"
            :rules="categoryRules"
            required
          ></v-select>
        </div>
        <div class="form-group">
          <v-select
            :items="sizes"
            item-text="size"
            item-value="size"
            v-model="pizza.size"
            label='Size(")'
            :rules="sizeRules"
          ></v-select>
        </div>
        <div class="form-group">
          <v-text-field
            v-model="pizza.price"
            label="Price"
            type="number"
            placeholder="Eg. 10.99"
            step=".01"
            min="1.00"
            :rules="priceRules"
          />
        </div>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <slot name="pizza-form-actions" v-bind:pizza="pizza"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import { dbMenuRef } from "@/firebase.js";

export default {
  name: "PizzaForm",
  props: {
    pizza: {
      type: Object,
      default: function () {
        return {
          name: "",
          description: "",
          category: "",
          size: 0,
          price: 0,
          times_ordered: 0,
        };
      },
    },
    categories: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
  },
  data() {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 5) || "Name must be greater than 5 characters",
      ],
      sizeRules: [(v) => !!v || "Size is required"],
      categoryRules: [(v) => !!v || "Category is required"],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length >= 5) ||
          "Description must be greater than 5 characters",
      ],
      priceRules: [(v) => !!v || "Price is required"],
    };
  },
  watch: {
    pizza(value) {
      this.$refs.pizzaForm.resetValidation();
    },
  },
  computed: {
    formValid() {
      return this.valid && this.pizza.options.length > 0;
    },
  },
  methods: {
    async handleNewPizza() {
      try {
        await dbMenuRef.add(this.newPizza);
        alert("New Pizza Added");
        this.resetPizzaForm();
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
    async handleUpdatePizza() {
      try {
        await dbMenuRef.doc(this.pizza.id).update(this.pizza);
        alert("Existing Pizza Updated");
        this.resetPizzaForm();
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
    async handleRemovePizza() {
      this.dialog = false;
      try {
        await dbMenuRef.doc(this.pizza.id).delete();
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  margin: 10px 0;
}
</style>