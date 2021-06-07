<template>
  <fieldset>
    <legend>
      <strong>Option</strong>
    </legend>
    <div class="form-group">
      <v-text-field
        id="size"
        ref="size"
        v-model.number.lazy="option.size"
        label="Size(&quot;)"
        type="text"
        placeholder="Eg. 9&quot; or 12&quot;"
      />
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
      />
    </div>
    <v-btn
      class="secondary"
      @click="handleAddOption"
    >
      Add Option
    </v-btn>
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
  methods: {
    handleAddOption() {
      const { size, price } = this.option;

      if (size && price) {
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