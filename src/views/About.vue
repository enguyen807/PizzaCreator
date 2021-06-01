<template>
  <div class="about">
    <h2>~ Click on the link below for more info ~</h2>
    <nav>
      <ul>
        <li>
          <router-link to="/history" class="nav-link">History</router-link>
        </li>
        <span>~</span>
        <li>
          <router-link to="/delivery" class="nav-link">Delivery</router-link>
        </li>
        <span>~</span>
        <li>
          <router-link to="/ordering-guide" class="nav-link"
            >Ordering Guide</router-link
          >
        </li>
      </ul>
    </nav>

    <router-view></router-view>
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