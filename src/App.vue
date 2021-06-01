<template>
  <div id="app">
    <BaseLayout>
      <router-view></router-view>
    </BaseLayout>
  </div>
</template>

<script>
import BaseLayout from "./layouts/default";
export default {
  name: "App",
  components: {
    BaseLayout,
  },
};
</script>

<style>
body {
  font-family: "Crimson Text", "serif";
  margin: 0;
  font-size: 1.5em;
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
