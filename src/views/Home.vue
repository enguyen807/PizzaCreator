<template>
  <div class="background">
    <div class="background-overlay">
      <div>
        <h1 class="text-h2 font-weight-bold">Welcome to Pizza Planet!</h1>
      </div>
      <div>
        <h3>Feeling Hungry?</h3>
        <router-link to="/menu">
          <v-btn type="button" class="primary">Order Now</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
h2,
h3 {
  margin: 2%;
}

.background {
  background: url("../assets/images/pizza_parallax-flipped-edit.jpg") center;
  background-size: cover;
  height: 55vh;
  display: flex;
  text-align: center;
  align-items: center;
}

.background-overlay {
  display: flex;
  flex-direction: column;
  /* background: #f1e6da; */
  opacity: 0.8;
  width: 30%;
  padding: 5px;
  justify-content: center;
}

.background-overlay > img {
  max-width: 15%;
}

.order_btn {
  background: #f79f38;
  border-radius: 3px;
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>