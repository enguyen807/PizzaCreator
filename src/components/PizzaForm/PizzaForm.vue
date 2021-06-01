<template>
  <form class="form_wrapper">
    <h3>Add new pizza:</h3>
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model="newPizza.name"
        placeholder="Eg. Margherita"
      />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        type="text"
        id="description"
        v-model="newPizza.description"
        rows="5"
        placeholder="Eg. A delicious tomato based pizza topped with mozzarella"
      ></textarea>
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
  name: "addNewPizza",
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

button.btn_green {
  background: rgb(63, 145, 63);
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.mt-5 {
  margin-top: 30px;
}

.form_wrapper {
  width: 50%;
}
</style>