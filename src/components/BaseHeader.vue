<template>
  <v-app-bar app light elevation="20">
    <v-img
      alt="Pizza Planet Logo"
      class="shrink mr-2"
      contain
      src="@/assets/images/pizza (1).png"
      transition="scale-transition"
      width="40"
      height="40"
    />
    <v-spacer />

    <v-btn to="/" text active-class="primary"> Home </v-btn>
    <v-btn to="/menu" text active-class="primary"> Menu </v-btn>
    <v-btn to="/contact" text active-class="primary"> Contact </v-btn>
    <v-btn to="/about" text active-class="primary"> About </v-btn>

    <v-spacer />

    <v-btn to="/login" text active-class="primary" class=""> Login </v-btn>
    <v-btn to="/register" text active-class="primary"> Register </v-btn>
    <v-btn class="ma-2" text icon color="primary">
      <v-icon>mdi-cart</v-icon>
      <span class="cart-notification accent white--text">0</span>
    </v-btn>
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
.v-sheet.v-app-bar.v-toolbar {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
}

.v-toolbar__title {
  font-size: 2rem !important;
}

.cart-notification {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  z-index: 2;
  position: absolute;
  right: 3px;
  bottom: 10px;
}
</style>