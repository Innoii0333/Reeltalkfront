<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink,
  },
}
</script>

<!-- css -->
<template>
  <div class="background">
    <header>
      <div style="color: white; margin-top: 5px; float: right">
        <RouterLink class="menu" to="/">
          Sign in |
        </RouterLink>
        <RouterLink class="menu" to="/" style="margin-right:10px">
          Sign up
        </RouterLink>
      </div>
      <a href="#" class="logo"><img
        alt="RT logo"
        style="width: 200px"
        src="./img/logo2.png"
      >
      </a>

      <div id="menu">
        <RouterLink to="/movie" style="color: white">
          Movie
        </RouterLink>
        <RouterLink to="/action" style="color: white">
          Action
        </RouterLink>
        <RouterLink to="/drama" style="color: white">
          Drama
        </RouterLink>
        <RouterLink to="/romance" style="color: white">
          Romance
        </RouterLink>
        <RouterLink to="/comedy" style="color: white">
          Comedy
        </RouterLink>
        <RouterLink to="/ani" style="color: white">
          Ani
        </RouterLink>
        <RouterLink to="/horror" style="color: white">
          Horror
        </RouterLink>
        <RouterLink to="/sf" style="color: white">
          SF
        </RouterLink>
        <RouterLink to="/fantasy" style="color: white">
          Fantasy
        </RouterLink>
        <RouterLink to="/etc" style="color: white">
          Etc
        </RouterLink>
      </div>
    </header>
  </div>
</template>

<style lang="scss">
.background {
  height: 45vh;
  overflow: hidden;
  background-image: url("./img/header.jpg");
  background-size: cover;
  background-size: no-repeat;
  background-position: center;
}
.logo {
  padding-left: 50px;
}
#menu {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: 325px;
  font-size: 20px;
}

#menu a {
  color: white;
  margin: 0 33px;
}
</style>
