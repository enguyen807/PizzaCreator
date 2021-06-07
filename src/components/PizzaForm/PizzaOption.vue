<template>
  <fieldset>
    <legend>
      <strong>Option</strong>
    </legend>
    <v-form ref="optionForm" v-model="valid" class="pa-3">
      <div class="form-group">
        <v-select
          :items="sizes"
          v-model="option.size"
          label='Size(")'
          :rules="[(v) => !!v || 'Size is required']"
        ></v-select>
      </div>
      <div class="form-group">
        <v-text-field
          id="price"
          ref="price"
          v-model.lazy="option.price"
          label="Price"
          type="number"
          placeholder="Eg. 10.99"
          step=".01"
          min="1.00"
          :rules="priceRules"
        />
      </div>
      <v-btn :disabled="!valid" class="secondary" @click="handleAddOption">
        Add Option
      </v-btn>
    </v-form>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      sizes: ["9", "12"],
      valid: false,
      priceRules: [(v) => !!v || "Price is required"],
      option: {
        size: 0,
        price: 0,
      },
    };
  },
  methods: {
    handleAddOption() {
      const { size, price } = this.option;

      if (size && price) {
        this.$emit("option-input", {
          size: size,
          price: +parseFloat(price).toFixed(2),
          times_ordered: 0,
        });
        this.$refs.optionForm.reset();
      }
    },
  },
};
</script>

<style>
</style>