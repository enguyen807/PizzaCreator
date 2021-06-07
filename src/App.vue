<template>
  <div id="app">
    <BaseLayout>
      <router-view />
    </BaseLayout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import BaseLayout from "./layouts/default";

export default {
  name: "App",
  components: {
    BaseLayout,
  },
  mounted() {
    this.getPizzas();
  },
  methods: {
    ...mapActions("product", ["getPizzas"]),
  },
};
</script>

<style>
body {
  font-family: "Baloo 2", cursive;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 10px 0;
  background: #f1e6da;
  text-transform: capitalize;
}

li {
  list-style: none;
}

ul > span {
  margin: 0 5px;
}
</style>
