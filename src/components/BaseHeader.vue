<template>
  <v-app-bar app light clipped-left>
    <v-img
      alt="Pizza Planet Logo"
      class="shrink mr-2"
      contain
      src="@/assets/images/pizza (1).png"
      transition="scale-transition"
      width="40"
      height="40"
    />

    <v-toolbar-title>Pizza Planet</v-toolbar-title>

    <v-spacer />

    <v-btn to="/" text active-class="primary"> Home </v-btn>
    <v-btn to="/menu" text active-class="primary"> Menu </v-btn>
    <v-btn to="/contact" text active-class="primary"> Contact </v-btn>
    <v-btn to="/about" text active-class="primary"> About </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-toolbar__title {
  font-size: 2rem !important;
}
</style>