<template>
  <fieldset>
    <legend class="text-h6 text-capitalize">
      {{ optionTitle }}
    </legend>
    <v-form ref="optionForm" v-model="valid" class="pa-3">
      <div class="form-group">
        <v-select
          :items="optionProp"
          item-text="size"
          item-value="size"
          return-object
          v-model="option"
          label='Size(")'
          hint="Please select a size to add or update an option"
          persistent-hint
          eager
          no-data-text="Please select a pizza"
          :rules="[(v) => !!v || 'Size is required']"
        ></v-select>
      </div>
      <div class="form-group">
        <v-text-field
          :id="`${optionName}Price`"
          v-bind:value="option.price"
          v-on:input="newOption.price = $event"
          label="Price"
          type="number"
          placeholder="Eg. 10.99"
          step=".01"
          min="1.00"
          :rules="priceRules"
        />
      </div>
      <div v-if="optionName === 'create'">
        <v-btn :disabled="!valid" class="accent" @click="handleAddOption">
          Add Option
        </v-btn>
      </div>
      <div class="d-flex justify-space-between" v-else>
        <v-btn :disabled="!valid" class="accent" @click="handleUpdateOption">
          Update Option
        </v-btn>
        <v-btn :disabled="!valid" class="error" @click="handleRemoveOption">
          Remove Option
        </v-btn>
      </div>
    </v-form>
  </fieldset>
</template>

<script>
export default {
  emit: ["add-option", "update-option"],
  props: {
    optionName: {
      type: String,
      default: "create",
    },
    optionProp: {
      type: Array,
      default: function () {
        return [
          { size: "9", price: 0 },
          { size: "12", price: 0 },
          { size: "15", price: 0 },
        ];
      },
    },
    tabChange: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      valid: false,
      priceRules: [(v) => !!v || "Price is required"],
      option: {
        size: 0,
        price: 0,
        times_ordered: 0,
      },
      defaultOption: {
        size: 0,
        price: 0,
        times_ordered: 0,
      },
      newOption: {
        price: 0,
      },
    };
  },
  computed: {
    optionTitle() {
      return this.optionName === "create"
        ? "Create A New Option"
        : "Update An Existing Option";
    },
  },
  watch: {
    tabChange() {
      this.option = this.defaultOption;
      this.$refs.optionForm.resetValidation();
    },
  },
  methods: {
    resetOption() {
      this.option = this.defaultOption;
      this.newOption = 0;
      this.$refs.optionForm.resetValidation();
    },
    handleAddOption() {
      const { size } = this.option;

      if (size && this.newOption.price) {
        this.$emit("add-option", {
          size: size,
          price: +parseFloat(this.newOption.price).toFixed(2),
          times_ordered: 0,
        });
        this.resetOption();
      }
    },
    handleUpdateOption() {
      const { size, times_ordered, price } = this.option;

      if (size && (this.newOption.price || price)) {
        this.$emit("update-option", {
          size: size,
          price: +parseFloat(this.newOption.price || price).toFixed(2),
          times_ordered: times_ordered,
        });
      }
    },
    handleRemoveOption() {
      const { size } = this.option;

      if (size) {
        this.$emit("remove-option", {
          size: size,
        });
        this.resetOption();
      }
    },
  },
};
</script>