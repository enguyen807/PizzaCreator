<template>
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card color="#f1e6da" elevation="5">
            <v-card-title class="justify-center text-h4">About Us</v-card-title>
            <v-card-text>
              <div class="text-h6 primary--text">our mission</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium earum amet sequi unde quis itaque illum delectus fugit
              temporibus reprehenderit deserunt, sapiente rem exercitationem
              corporis! Maiores qui molestias cumque amet.</v-card-text
            >
            <v-card-text>
              <div class="text-h6 primary--text">our ingredients</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium earum amet sequi unde quis itaque illum delectus fugit
              temporibus reprehenderit deserunt, sapiente rem exercitationem
              corporis! Maiores qui molestias cumque amet.</v-card-text
            >
            <v-card-text>
              <div class="text-h6 primary--text">dedication to great pizza</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium earum amet sequi unde quis itaque illum delectus fugit
              temporibus reprehenderit deserunt, sapiente rem exercitationem
              corporis! Maiores qui molestias cumque amet.</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>