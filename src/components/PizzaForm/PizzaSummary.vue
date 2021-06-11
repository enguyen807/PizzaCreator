<template>
  <v-card class="pa-5">
    <v-card-title>{{ summaryTitle }}</v-card-title>
    <v-card-text v-if="deleteStatus === 'deletingPizza'">
      <div>Name: {{ pizza.name }}</div>
      <div class="text-truncate">
        Description:
        {{ pizza.description }}
      </div>
      <div>Category: {{ pizza.category }}</div>
      <v-divider />
      <div>
        <div v-for="(option, index) in pizza.options" :key="index">
          <div>Size: {{ option.size }}</div>
          <div>Price: {{ option.price }}</div>
          <div>Times Ordered: {{ selectedPizza.times_ordered }}</div>
          <v-divider />
        </div>
      </div>
    </v-card-text>
    <v-card-text v-else>
      <div>Size: {{ selectedPizza.size }}</div>
      <div>Price: {{ selectedPizza.price }}</div>
      <div>Times Ordered: {{ selectedPizza.times_ordered }}</div>
    </v-card-text>
    <v-card-actions>
      <slot name="pizza-summary-actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    deleteStatus: {
      type: String,
      default: "deletingOption",
    },
    pizzaId: {
      type: String,
      default: "",
    },
    selectedPizza: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  computed: {
    pizza() {
      return this.$store.getters["product/getPizzaById"](this.pizzaId);
    },
    summaryTitle() {
      return this.deleteStatus === "deletingPizza"
        ? "Are you sure you want to delete this pizza?"
        : "Are you sure you want to delete this option? ";
    },
  },
};
</script>

<style>
</style>