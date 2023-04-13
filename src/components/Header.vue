<script setup lang="ts">

</script>

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
        <RouterLink to="/movielist/movie" style="color: white">
          Movie
        </RouterLink>
        <RouterLink to="/movielist/action" style="color: white">
          Action
        </RouterLink>
        <RouterLink to="/movielist/drama" style="color: white">
          Drama
        </RouterLink>
        <RouterLink to="/movielist/romance" style="color: white">
          Romance
        </RouterLink>
        <RouterLink to="/movielist/comedy" style="color: white">
          Comedy
        </RouterLink>
        <RouterLink to="/movielist/ani" style="color: white">
          Ani
        </RouterLink>
        <RouterLink to="/movielist/horror" style="color: white">
          Horror
        </RouterLink>
        <RouterLink to="/movielist/sf" style="color: white">
          SF
        </RouterLink>
        <RouterLink to="/movielist/fantasy" style="color: white">
          Fantasy
        </RouterLink>
        <RouterLink to="/movielist/etc" style="color: white">
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
  margin-top: 300px;
  font-size: 20px;
}

#menu a {
  color: white;
  margin: 0 33px;
}
</style>
