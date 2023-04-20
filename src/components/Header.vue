<script setup lang="ts">
const session = useSessionStore()
const openLogin = () => {
  const loginWindow = window.open('/login', 'loginWindow',
   `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)
  if (loginWindow) {
    window.addEventListener('message', async (event) => {
      console.log('Received message:', event.data.message)
      if (event.origin !== window.location.origin)
        return // 보안을 위한 체크
      if (event.source !== loginWindow)
        return
      if (event.data.message === 'session_ready') { loginWindow.postMessage({ message: 'give-me-data' }) }
      else if (event.data) {
        console.log(event.data)
        try {
          await session.checkLogin()
          loginWindow.postMessage({ message: 'authenticated' })
        }
        catch (e) {
          loginWindow.postMessage({ message: 'invalid-session' })
        }
      }
    })
  }
}

const openSignup = () => {
  window.open('/signup', 'signupWindow',
  `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)
}
</script>

<template>
  <div class="background">
    <div style="color: white; margin-top: 5px; float: right">
      <button class="menu" @click="openLogin">
        Sign in
      </button>
      <span class="mx-1">|</span>
      <button class="menu" style="margin-right:10px" @click="openSignup">
        Sign up
      </button>
    </div>
    <a href="/main" class="logo"><img
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
  margin-top: 280px;
  font-size: 20px;
}

#menu a {
  color: white;
  margin: 0 33px;
}
</style>
