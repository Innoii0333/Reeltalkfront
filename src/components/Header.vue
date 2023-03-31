<script>
export default {}
</script>

<template>
  <div class="background">
    <header>
      <div style="color: white; float: right">
        <router-link class="menu" to="/">
          Sign in |
        </router-link>
        <router-link class="menu" to="/">
          Sign up
        </router-link>
      </div>
      <a href="#" class="logo"><img
        alt="RT logo"
        style="width: 200px"
        src="./img/logo2.png"
      >
      </a>

      <div id="nav" style="position: absolute; bottom: 0px">
        <router-link to="/" style="color: white">
          | menu1 |
        </router-link>
        <router-link to="/" style="color: white">
          menu2 |
        </router-link>
        <router-link to="/" style="color: white">
          menu3 |
        </router-link>
        <router-link to="/" style="color: white">
          menu4 |
        </router-link>
      </div>
    </header>
  </div>
</template>

<!-- css -->
<style lang="scss">
.background {
  height: 40vh;
  overflow: hidden;
  background-image: url("./img/header.jpg");
  background-size: cover;
  background-size: no-repeat;
  background-position: center;
}
.logo {
  padding-left: 20px;
}
</style>
