<template>
  <v-card class="pa-5">
    <v-card-title>Add Option</v-card-title>
    <v-card-text>
      <v-form ref="optionForm" v-model="valid">
        <div class="form-group">
          <v-select
            :items="sizes"
            item-text="size"
            item-value="size"
            v-model="option.size"
            label='Size(")'
            no-data-text="Maximum options for pizza reached."
            :rules="[(v) => !!v || 'Size is required']"
          ></v-select>
        </div>
        <div class="form-group">
          <v-text-field
            v-model.number="option.price"
            label="Price"
            type="number"
            placeholder="Eg. 10.99"
            step=".01"
            min="1.00"
            :rules="priceRules"
          />
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <slot name="pizza-option-actions" v-bind:option="option"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
    },
    price: {
      type: Number,
    },
    dialog: {
      type: Boolean,
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
    };
  },
  computed: {},
  watch: {
    price(val) {
      this.option.price = val;
    },
    dialog(val) {
      const { option, defaultOption } = this;
      if (!val) {
        option = defaultOption;
      }
    },
  },
  methods: {},
};
</script>