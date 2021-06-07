<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card elevation="5" outlined class="info_block" color="#f1e6da">
          <v-card-title class="text-h5">~ How to order ~</v-card-title>
          <v-card-text class="info_block_content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Provident quasi architecto eos sapiente voluptatem atque eveniet,
              necessitatibus quam aspernatur quas enim similique quibusdam quia
              alias soluta cum odio? Asperiores, architecto.
            </p>
            <img src="../assets/images/order.png" alt="order image" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderingGuide",
};
</script>

<style scoped>
.v-card__title {
  display: block;
  text-align: center;
}
</style>