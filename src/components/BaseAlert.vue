<template>
  <v-alert
    v-show="alert.showAlert"
    :type="alert.type"
    dismissible
    transition="scale-transition"
    @click="clearAlert"
  >
    {{ alert.message }}
  </v-alert>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  watch: {
    $route() {
      this.clearAlert();
    },
  },
  mounted() {
    console.log("Alert mounted");
  },
  methods: {
    ...mapActions("alert", ["clear"]),
    clearAlert() {
      if (!this.showAlert) return;
      this.clear();
    },
  },
};
</script>

<style>
.v-alert {
  position: fixed !important;
  z-index: 1;
  width: 100%;
}
</style>