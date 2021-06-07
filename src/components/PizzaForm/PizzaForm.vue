<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col md="6" cols="12">
        <v-card elevation="4">
          <v-card-title>Create new pizza:</v-card-title>
          <v-card-text>
            <v-form ref="pizzaForm" class="form_wrapper pa-3" v-model="valid">
              <div class="form-group">
                <v-text-field
                  id="name"
                  v-model="newPizza.name"
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
                  v-model="newPizza.description"
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
                  v-model="newPizza.category"
                  label="Category"
                  :rules="[(v) => !!v || 'Category is required']"
                  required
                ></v-select>
              </div>
              <PizzaOption @option-input="handleOptionInput" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <v-card height="100%" min-height="100%" class="" elevation="4">
          <v-card-title>New Pizza Summary</v-card-title>
          <v-card-text>
            <div v-show="newPizza.name">Name: {{ newPizza.name }}</div>
            <div v-show="newPizza.description">
              Description: {{ newPizza.description }}
            </div>
            <div v-show="newPizza.category">
              Category: {{ newPizza.category }}
            </div>
            <v-divider />
            <div v-show="newPizza.options.length > 0">
              <div v-for="(option, index) in newPizza.options" :key="index">
                <div>Size: {{ option.size }}</div>
                <div>Price: {{ option.price }}</div>
                <v-divider />
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="accent"
              @click="handleNewPizzaForm"
              :disabled="!formValid"
            >
              Add New Pizza
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuRef } from "@/firebase.js";
import PizzaOption from "@/components/PizzaForm/PizzaOption.vue";

export default {
  name: "AddNewPizza",
  components: {
    PizzaOption,
  },
  data() {
    return {
      valid: false,
      test: [],
      categories: ["meat", "vegetarian", "vegan"],
      newPizza: {
        name: "",
        description: "",
        category: "",
        options: [],
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 5) || "Name must be greater than 5 characters",
      ],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length >= 5) ||
          "Description must be greater than 5 characters",
      ],
    };
  },
  computed: {
    formValid() {
      return this.valid && this.newPizza.options.length > 0;
    },
  },
  methods: {
    handleOptionInput(event) {
      this.newPizza.options.push({ ...event });
    },
    handleNewPizzaForm() {
      try {
        dbMenuRef.add(this.newPizza);
        alert("New Pizza Added");
        this.$refs.pizzaForm.reset();
        this.newPizza.options = [];
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

label {
  display: block;
  margin: 0 0 10px 0;
}

input,
textarea,
fieldset {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  background: rgb(254, 254, 252);
  border: solid 1px #f79e38;
}

.form_wrapper {
  width: 100%;
}
</style>