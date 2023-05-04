<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>Hello App!</h1>
  <p>111111111111</p>
  <p>
    11111111111111
    <router-link to="/">Go to Home</router-link>
    <router-link to="/main">Go to Main</router-link>
    11111111111111
  </p>
  <p>11111111</p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
