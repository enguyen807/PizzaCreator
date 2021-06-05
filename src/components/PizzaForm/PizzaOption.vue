<template>
  <fieldset>
    <legend>
      <strong>Option</strong>
    </legend>
    <div class="form-group">
      <v-text-field
        id="size"
        label='Size(")'
        ref="size"
        v-model.number.lazy="option.size"
        type="text"
        placeholder='Eg. 9" or 12"'
      />
    </div>
    <div class="form-group">
      <v-text-field
        label="Price"
        id="price"
        ref="price"
        v-model.lazy="option.price"
        type="number"
        placeholder="Eg. 10.99"
        step=".01"
        min="1.00"
      />
    </div>
    <v-btn class="secondary">Add Option</v-btn>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      option: {
        size: "",
        price: "",
      },
    };
  },
  watch: {},
  methods: {
    handleAddOption() {
      const { size, price } = this.option;

      if (size && price) {
        console.log(this.$refs.size.blur());
        this.$emit("option-input", {
          size: size,
          price: parseFloat(price).toFixed(2),
        });
      }
    },
  },
};
</script>

<style>
</style>