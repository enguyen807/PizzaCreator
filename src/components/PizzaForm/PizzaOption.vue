<template>
  <fieldset>
    <legend>
      <strong>Option</strong>
    </legend>
    <div class="form-group">
      <label for="size">Size(")</label>
      <input
        id="size"
        ref="size"
        v-model.number.lazy="option.size"
        type="number"
        placeholder="Eg. 9&quot; or 12&quot;"
      >
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        id="price"
        ref="price"
        v-model.lazy="option.price"
        type="number"
        placeholder="Eg. 10.99"
        step=".01"
      >
    </div>
    <button
      type="button"
      class="btn_green"
    >
      Add Option
    </button>
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