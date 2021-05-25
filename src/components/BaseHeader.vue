<template>
  <header>
    <div class="header_logo">
      <img src="@/assets/images/planet.png" alt="pizza planet icon" />
      <h1 href="/">PIZZA PLANET</h1>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/">home</router-link>
        </li>
        <span>~</span>
        <li>
          <router-link to="/menu">menu</router-link>
        </li>
        <span>~</span>
        <li>
          <router-link to="/contact">contact us</router-link>
        </li>
        <span>~</span>
        <li>
          <router-link to="/about">about us</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
h1 {
  font-size: 1.3em;
}

.header_logo {
  background-image: linear-gradient(
    45deg,
    #d85226 25%,
    #f79e38 25% 50%,
    #d85226 50% 75%,
    #f79e38 75%,
    #f79e38 100%
  );
  background-size: 80px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.header_logo img {
  max-width: 25vw;
}

ul {
  padding: 10px 0;
}

li {
  display: inline-block;
}

@media screen and (min-width: 900px) {
  .header_logo img {
    max-width: 20vw;
  }
}
</style>