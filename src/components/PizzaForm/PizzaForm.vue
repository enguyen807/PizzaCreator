<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col md="6" cols="12">
        <v-card elevation="4">
          <v-tabs v-model="tab">
            <v-tab>Create New Pizza</v-tab>
            <v-tab>Update Existing Pizza</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-form ref="pizzaForm" class="form_wrapper pa-3" v-model="valid">
              <v-tab-item>
                <v-card-text>
                  <div class="form-group">
                    <v-text-field
                      id="name"
                      v-model="pizza.name"
                      type="text"
                      label="Name"
                      :rules="tab === 0 ? nameRules : []"
                      placeholder="Eg. Margherita"
                      :required="tab === 0 ? true : false"
                    />
                  </div>
                  <div class="form-group">
                    <v-textarea
                      id="description"
                      v-model="pizza.description"
                      type="text"
                      rows="3"
                      label="Description"
                      :rules="tab === 0 ? descriptionRules : []"
                      placeholder="Eg. A delicious tomato based pizza topped with mozzarella"
                      :required="tab === 0 ? true : false"
                    />
                  </div>
                  <div class="form-group">
                    <v-select
                      :items="categories"
                      v-model="pizza.category"
                      label="Category"
                      :rules="tab === 0 ? categoryRules : []"
                      :required="tab === 0 ? true : false"
                    ></v-select>
                  </div>
                  <PizzaOption
                    class="form-group"
                    @add-option="handleAddNewOption"
                  />
                </v-card-text>
              </v-tab-item>
              <v-tab-item>
                <v-card-text>
                  <div class="form-group">
                    <v-select
                      :items="pizzas"
                      item-text="name"
                      v-model="pizza"
                      label="Select A Pizza To Update"
                      return-object
                      :rules="tab === 1 ? existingPizzaSelectRules : []"
                      :required="tab === 1 ? true : false"
                    ></v-select>

                    <v-text-field
                      id="existingName"
                      type="text"
                      label="Name"
                      v-model="pizza.name"
                      :rules="tab === 1 ? nameRules : []"
                      :required="tab === 1 ? true : false"
                    />

                    <v-textarea
                      id="existingDescription"
                      type="text"
                      rows="3"
                      label="Description"
                      v-model="pizza.description"
                      :rules="tab === 1 ? descriptionRules : []"
                      :required="tab === 1 ? true : false"
                    />

                    <v-select
                      :items="categories"
                      v-model="pizza.category"
                      label="Category"
                      :rules="tab === 1 ? categoryRules : []"
                      :required="tab === 1 ? true : false"
                    ></v-select>

                    <!-- <PizzaOption
                      @add-option="handleAddNewOption"
                      option-name="create"
                      class="mb-5"
                    /> -->

                    <PizzaOption
                      @update-option="handleUpdateOption"
                      :option-prop="pizza.options"
                      :tab-change="tab"
                      option-name="update"
                    />
                  </div>
                </v-card-text>
              </v-tab-item>
            </v-form>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <PizzaSummary :pizza="pizza" :tab="tab">
          <template #card-actions>
            <v-card-actions v-if="tab === 0">
              <v-btn
                class="accent"
                @click="handleNewPizza"
                :disabled="!formValid"
              >
                Add New Pizza
              </v-btn>
            </v-card-actions>
            <v-card-actions class="justify-space-between" v-else>
              <v-btn
                class="accent"
                @click="handleUpdatePizza"
                :disabled="!formValid"
                >Update Existing Pizza</v-btn
              >
              <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="error"
                    :disabled="!formValid"
                    >Remove Pizza</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title class="text-h5"> Are you sure? </v-card-title>
                  <v-card-text>You're about to delete </v-card-text>
                  <v-card-text
                    ><PizzaSummary :pizza="pizza" :tab="tab" />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Disagree
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="handleRemovePizza"
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </template>
        </PizzaSummary>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuRef } from "@/firebase.js";
import { mapState } from "vuex";
import PizzaSummary from "@/components/PizzaForm/PizzaSummary.vue";
import PizzaOption from "@/components/PizzaForm/PizzaOption.vue";

export default {
  name: "PizzaForm",
  components: {
    PizzaSummary,
    PizzaOption,
  },
  data() {
    return {
      valid: false,
      tab: null,
      dialog: false,
      categories: ["meat", "vegetarian", "vegan"],
      pizza: {
        name: "",
        description: "",
        category: "",
        options: [],
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length >= 5) || "Name must be greater than 5 characters",
      ],
      categoryRules: [(v) => !!v || "Category is required"],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length >= 5) ||
          "Description must be greater than 5 characters",
      ],
      existingPizzaSelectRules: [
        (v) => !!v || "Existing Pizza Select is required",
      ],
    };
  },
  watch: {
    tab(value) {
      const pizzaObj = {
        name: "",
        description: "",
        category: "",
        options: [],
      };
      this.pizza = pizzaObj;
      this.$refs.pizzaForm.resetValidation();
    },
  },
  computed: {
    ...mapState("product", ["pizzas"]),
    formValid() {
      return this.valid && this.pizza.options.length > 0;
    },
  },
  methods: {
    handleAddNewOption(event) {
      this.pizza.options.push({ ...event });
    },
    handleUpdateOption(event) {
      const optionIndex = this.pizza.options.findIndex(
        (option) => option.size === event.size
      );

      this.pizza.options[optionIndex].price = event.price;
    },
    async handleNewPizza() {
      try {
        await dbMenuRef.add(this.newPizza);
        alert("New Pizza Added");
        this.$refs.pizzaForm.reset();
        this.pizzaObj.options = [];
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
    async handleUpdatePizza() {
      try {
        await dbMenuRef.doc(this.pizza.id).update(this.pizza);
        alert("Existing Pizza Updated");
        this.$refs.pizzaForm.reset();
        this.pizzaObj.options = [];
      } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
      }
    },
    async handleRemovePizza() {
      this.dialog = false;
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