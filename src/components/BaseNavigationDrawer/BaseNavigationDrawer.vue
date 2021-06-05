<template>
  <v-navigation-drawer
    disable-resize-watcher
    app
    :value="value"
    @input="$emit('input', $event)"
    clipped
  >
    <v-list>
      <v-list-item
        v-for="link in links"
        :to="link['href']"
        :key="link['title']"
      >
        <v-list-item-icon
          ><v-icon>{{ link["icon"] }}</v-icon></v-list-item-icon
        >
        <v-list-item-content>{{ link["title"] }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
    links: {
      type: Array,
    },
  },
};
</script>

<style>
</style>