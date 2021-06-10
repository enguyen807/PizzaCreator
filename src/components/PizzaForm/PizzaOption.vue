<template>
  <v-container fluid>
    <v-row class="justify-space-around">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-form ref="optionForm" v-model="valid" class="pa-3">
              <div class="form-group">
                <v-select
                  :items="sizes"
                  item-text="size"
                  item-value="size"
                  v-model="option.size"
                  label='Size(")'
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
              <slot name="pizza-option-actions" v-bind:option="option"></slot>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      console.log(val);
      this.option.price = val;
    },
  },
  methods: {},
};
</script>