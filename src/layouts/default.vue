<template>
  <v-app>
    <BaseHeader />
    <v-main>
      <slot />
      <div class="info_block_wrapper">
        <router-view name="ordering-guide" />
        <router-view name="delivery" />
        <router-view name="history" />
      </div>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        Icons made by
        <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
        <a href="https://www.flaticon.com/" title="Flaticon"
          >www.flaticon.com</a
        ></v-col
      >
    </v-footer>
  </v-app>
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
.info_block_wrapper {
  display: flex;
  flex-direction: column;
}

.info_block {
  background: #f1e6da;
  margin: 10px 0;
  padding: 10px;
}

.info_block h3 {
  text-align: center;
}

.info_block_content {
  display: flex;
  align-items: center;
}

.info_block img {
  width: 30%;
}

@media screen and (min-width: 900px) {
  .info_block {
    width: 100%;
    padding: 0px 15px !important;
  }
  .info_block_wrapper {
    flex-direction: row;
  }
  .info_block:nth-child(2) {
    margin: 10px;
  }

  .info_block:nth-child(2) img {
    order: -1;
  }

  .info_block_content {
    flex-direction: column;
    align-items: center;
  }
  .info_block img {
    max-width: 100%;
  }
}
</style>