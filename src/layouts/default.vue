<template>
  <div>
    <BaseHeader></BaseHeader>
    <slot></slot>
  </div>
</template>

<script>
import BaseHeader from "../components/BaseHeader";
export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
  },
};
</script>

<style>
</style>