<template>
  <v-card>
    <v-card-title>Add new pizza:</v-card-title>
    <v-card-text>
      <form class="form_wrapper pa-3">
        <div class="form-group">
          <v-text-field
            id="name"
            v-model="newPizza.name"
            type="text"
            label="Name"
            placeholder="Eg. Margherita"
          />
        </div>
        <div class="form-group">
          <v-textarea
            id="description"
            v-model="newPizza.description"
            type="text"
            rows="5"
            label="Description"
            placeholder="Eg. A delicious tomato based pizza topped with mozzarella"
          />
        </div>
        <PizzaOption @option-input="handleOptionInput" />

        <v-btn class="accent mt-5" @click="handleNewPizzaForm">
          Add New Pizza
        </v-btn>
        <div class="mt-5">{{ newPizza }}</div>
      </form>
    </v-card-text>
  </v-card>
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
      newPizza: {
        name: "",
        description: "",
        options: [],
      },
    };
  },
  methods: {
    handleOptionInput(event) {
      this.newPizza.options.push(event);
    },
    handleNewPizzaForm() {
      dbMenuRef.add(this.newPizza);
    },
  },
};
</script>

<style scoped>
.form-group {
  margin: 10px 0;
}

.v-card {
  width: 100%;
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