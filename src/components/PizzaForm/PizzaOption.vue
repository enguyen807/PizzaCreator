<template>
  <div>
    <p>
      <strong>{{ optionName }}:</strong>
    </p>
    <div class="form-group">
      <label for="size">Size(")</label>
      <input
        type="number"
        id="size"
        v-model.lazy="option.size"
        placeholder='Eg. 9" or 12"'
      />
    </div>
    <div class="form-group">
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        v-model.lazy="option.price"
        placeholder="Eg. 10.99"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    optionName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      option: {
        size: "",
        price: "",
      },
    };
  },
  watch: {
    option: {
      deep: true,
      handler() {
        const { size, price } = this.option;

        if (size && price) {
          this.$emit("option-input", {
            size: +size,
            price: parseFloat(price).toFixed(2),
          });
        }
      },
    },
  },
  methods: {},
};
</script>

<style>
</style>