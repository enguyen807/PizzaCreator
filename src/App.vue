<template>
  <div id="app">
    <BaseLayout>
      <router-view />
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

<style lang="scss">
</style>
