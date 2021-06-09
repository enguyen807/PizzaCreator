<template>
  <v-card min-height="100%" elevation="4">
    <v-card-title>Pizza Summary</v-card-title>
    <v-divider />
    <v-card-text v-if="formValid">
      <div v-show="pizza.name">Name: {{ pizza.name }}</div>
      <div class="text-truncate" v-show="pizza.description">
        Description:
        {{ pizza.description }}
      </div>
      <div v-show="pizza.category">Category: {{ pizza.category }}</div>
      <v-divider />
      <div>
        <div v-for="(option, index) in pizza.options" :key="index">
          <div>Size: {{ option.size }}</div>
          <div>Price: {{ option.price }}</div>
          <v-divider />
        </div>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <div class="text-h6">Nothing here.</div>
      To start create a new pizza or update an existing pizza by selecting a
      pizza from the current list of pizzas.
    </v-card-text>
    <slot name="card-actions"></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    tab: {
      type: Number,
      default: 0,
    },
    pizza: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  computed: {
    formValid() {
      if (
        this.pizza.name ||
        this.pizza.description ||
        this.pizza.category ||
        this.pizza.options.length > 0
      )
        return true;
      return false;
    },
  },
};
</script>

<style>
</style>