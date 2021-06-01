<template>
  <fieldset>
    <legend>
      <strong>Option</strong>
    </legend>
    <div class="form-group">
      <label for="size">Size(")</label>
      <input
        type="number"
        id="size"
        ref="size"
        v-model.number.lazy="option.size"
        placeholder='Eg. 9" or 12"'
      />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        ref="price"
        v-model.lazy="option.price"
        placeholder="Eg. 10.99"
        step=".01"
      />
    </div>
    <button type="button" class="btn_green">Add Option</button>
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