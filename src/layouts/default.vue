<template>
  <v-app>
    <BaseHeader />
    <BaseAlert />
    <v-main>
      <slot />
      <div class="info_block_wrapper">
        <router-view name="ordering-guide" />
        <router-view name="delivery" />
        <router-view name="history" />
      </div>
    </v-main>
    <BaseFooter />
  </v-app>
</template>

<script>
import BaseHeader from "@/components/BaseHeader";
import BaseFooter from "@/components/BaseFooter";
import BaseAlert from "@/components/BaseAlert";

export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
    BaseFooter,
    BaseAlert,
  },
};
</script>

<style>
</style>