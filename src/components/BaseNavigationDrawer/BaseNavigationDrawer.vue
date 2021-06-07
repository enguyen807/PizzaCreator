<template>
  <v-navigation-drawer
    disable-resize-watcher
    app
    :value="value"
    clipped
    @input="$emit('input', $event)"
  >
    <v-list>
      <v-list-item
        v-for="link in links"
        :key="link['title']"
        :to="link['href']"
      >
        <v-list-item-icon>
          <v-icon>{{ link["icon"] }}</v-icon>
        </v-list-item-icon>
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
      default: function () {
        return [
          {
            title: "Home",
            icon: "mdi-home-city",
            href: "/",
          },
          {
            title: "Menu",
            icon: "mdi-silverware",
            href: "/menu",
          },
          {
            title: "Contact",
            icon: "mdi-card-account-mail-outline",
            href: "/contact",
          },
          {
            title: "About",
            icon: "mdi-help-box",
            href: "/about",
          },
        ];
      },
    },
  },
};
</script>

<style>
</style>