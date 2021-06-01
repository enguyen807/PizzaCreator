<template>
  <form class="form_wrapper">
    <h3>Add new pizza:</h3>
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="newPizza.name"
        type="text"
        placeholder="Eg. Margherita"
      />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="newPizza.description"
        type="text"
        rows="5"
        placeholder="Eg. A delicious tomato based pizza topped with mozzarella"
      />
    </div>
    <PizzaOption @option-input="handleOptionInput" />

    <button type="button" class="btn_green mt-5" @click="handleNewPizzaForm">
      Add New Pizza
    </button>
    {{ newPizza }}
  </form>
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

<style>
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
  width: 50%;
}
</style>