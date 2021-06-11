<template>
  <div class="admin_wrapper">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card class="menu_wrapper" elevation="4">
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="products"
                class="elevation-0"
                group-by="name"
                sort-by="size"
                item-key="name + size"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Menu</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon small class="mr-2"> mdi-plus </v-icon>
                          New Pizza
                        </v-btn>
                      </template>

                      <PizzaForm
                        :pizza="selectedPizza"
                        :sizes="sizes"
                        :categories="categories"
                      >
                        <template #pizza-form-actions>
                          <v-card-actions>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="handleClose"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="handleSaveItem"
                            >
                              Save
                            </v-btn>
                          </v-card-actions>
                        </template>
                      </PizzaForm>
                    </v-dialog>

                    <v-dialog v-model="dialogOption" max-width="500px">
                      <PizzaOption
                        :dialog="dialogOption"
                        :sizes="
                          selectedIndex > -1
                            ? [selectedPizza.size]
                            : availableSizes
                        "
                        :price="selectedIndex > -1 ? selectedPizza.price : 0"
                        @price-value="selectedPizza.price = $event"
                        @size-value="selectedPizza.size = $event"
                      >
                        <template #pizza-option-actions="{ option }">
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="handleClose"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="handleUpdateItem(option)"
                          >
                            Update
                          </v-btn>
                        </template>
                      </PizzaOption>
                    </v-dialog>

                    <v-dialog v-model="dialogDelete" max-width="500px">
                      <PizzaSummary
                        :delete-status="deleteStatus"
                        :pizza-id="selectedPizza.id"
                        :selected-pizza="selectedPizza"
                      >
                        <template #pizza-summary-actions>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="handleCloseDelete"
                            >Cancel</v-btn
                          >
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="handleDeleteItemConfirm"
                            >OK</v-btn
                          >
                        </template>
                      </PizzaSummary>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <!-- Custom Group Data Table Headers -->
                <template #[`group.header`]="{ group, items, isOpen, toggle }">
                  <td colspan="6">
                    <div class="d-inline-block my-sm-3 mt-3">
                      <v-btn icon small @click="toggle">
                        <v-icon v-if="isOpen"> mdi-minus </v-icon>
                        <v-icon v-else> mdi-plus </v-icon>
                      </v-btn>
                      Category: {{ group }} ({{ items.length }} in the group)
                    </div>
                    <div class="d-inline-block my-sm-3 my-3 float-sm-right">
                      <v-btn
                        x-small
                        class="accent darken-1"
                        @click="toggleAddOptionDialog(items)"
                      >
                        Add Option
                      </v-btn>
                      <v-btn
                        x-small
                        class="error darken-1 ml-3"
                        @click="toggleDeleteDialog(items[0], 'deletingPizza')"
                      >
                        Remove Pizza
                      </v-btn>
                    </div>
                  </td>
                </template>
                <!-- Custom Data Table Actions for each row -->
                <template #[`item.actions`]="{ item }">
                  <v-btn
                    icon
                    small
                    @click="toggleUpdateOptionDialog(item)"
                    class="mr-2 secondary lighten-3"
                  >
                    <v-icon small> mdi-pencil </v-icon>
                  </v-btn>

                  <v-btn
                    icon
                    small
                    @click="toggleDeleteDialog(item, 'deletingOption')"
                    class="error lighten-1"
                  >
                    <v-icon small> mdi-delete </v-icon>
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
import PizzaForm from "@/components/PizzaForm/PizzaForm.vue";
import PizzaOption from "@/components/PizzaForm/PizzaOption.vue";
import PizzaSummary from "@/components/PizzaForm/PizzaSummary.vue";

import { firebaseAuth } from "@/firebase";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Admin",
  components: {
    PizzaForm,
    PizzaOption,
    PizzaSummary,
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      categories: ["meat", "vegetarian", "vegan"],
      sizes: ["9", "12", "15"],
      availableSizes: [],
      dialog: false,
      dialogOption: false,
      dialogDelete: false,
      selectedIndex: -1,
      saving: false,
      deleteStatus: "",
      selectedPizza: {
        id: "",
        name: "",
        description: "",
        category: "",
        size: 0,
        price: 0,
        times_ordered: 0,
      },
      defaultPizza: {
        id: "",
        name: "",
        description: "",
        category: "",
        size: 0,
        price: 0,
        times_ordered: 0,
      },
    };
  },
  computed: {
    ...mapGetters("product", ["products"]),
  },
  watch: {
    dialog(val) {
      val || this.handleClose();
    },
    dialogOption(val) {
      val || this.handleClose();
    },
    dialogDelete(val) {
      val || this.handleCloseDelete();
    },
  },
  methods: {
    ...mapActions("product", [
      "addOption",
      "deleteOption",
      "createPizza",
      "deletePizza",
    ]),
    async logOut() {
      try {
        await firebaseAuth.signOut();
      } catch (error) {
        alert(`error signing out, ${error}`);
      }
    },
    handleClose() {
      this.dialog = false;
      this.dialogOption = false;
      this.$nextTick(() => {
        this.selectedPizza = Object.assign({}, this.defaultPizza);
        this.availableSizes = [];
        this.selectedIndex = -1;
      });
    },
    handleCloseDelete() {
      this.deleteStatus = "";
      this.dialogDelete = false;
    },
    handleDeleteItemConfirm() {
      if (this.deleteStatus === "deletingPizza") {
        this.deletePizza(this.selectedPizza);
      } else {
        this.deleteOption(this.selectedPizza);
      }
      this.handleCloseDelete();
    },
    handleSaveItem() {
      if (this.selectedIndex > -1) {
        Object.assign(this.products[this.selectedIndex], this.selectedPizza);
      } else {
        this.createPizza(this.selectedPizza);
      }
      this.handleClose();
    },
    handleUpdateItem(option) {
      const pizzaOption = {
        id: this.selectedPizza.id,
        ...option,
      };
      this.addOption(pizzaOption);
      this.handleClose();
    },
    handleDeletePizza() {},
    toggleAddOptionDialog(items) {
      const currentPizzaSizes = items.map((item) => item.size);
      const availableSizes = this.sizes.filter(
        (size) => !currentPizzaSizes.some((cSize) => size === cSize)
      );
      this.availableSizes.push(...availableSizes);
      this.selectedPizza = items[0];
      this.dialogOption = true;
    },
    toggleUpdateOptionDialog(item) {
      this.selectedIndex = this.products.indexOf(item);
      this.selectedPizza = Object.assign({}, item);
      this.dialogOption = true;
    },
    toggleDeleteDialog(item, deleteStatus) {
      this.deleteStatus = deleteStatus;
      this.selectedPizza = Object.assign({}, item);
      this.dialogDelete = true;
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

.text-start {
  text-align: center;
}

.order_number th {
  background: #ddd;
}

.order_number button {
  margin: 0 10px;
}
</style>