<script setup lang="ts">
const session = useSessionStore()
const openLogin = () => {
  const loginWindow = window.open('/login/login', '_blank',
   `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)

  window.addEventListener('message', async (event) => {
    if (event.origin !== window.location.origin)
      return
    if (event.source !== loginWindow)
      return
    if (event.data) {
      session.initToken([event.data[0], event.data[1]])
      try {
        await session.getSession()
        loginWindow?.postMessage({ message: 'authenticated' })
      }
      catch {
        loginWindow?.postMessage({ message: 'invalid-session' })
      }
    }
  })
}

const openSignup = () => {
  window.open('/signup', 'signupWindow',
  `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)
}
onMounted(async () => {
  await session.checkLogin()
})
</script>

<template>
  <div class="background relative">
    <div v-if="!session.isLoggedIn" style="color: white; margin-top: 5px; margin-right:10px; float: right">
      <button class="menu" @click="openLogin">
        Sign in
      </button>
      <span class="mx-1">|</span>
      <button class="menu" style="margin-right:10px" @click="openSignup">
        Sign up
      </button>
    </div>
    <div v-else style="color: white; margin-top: 5px; margin-right:10px; float: right">
      <button class="menu" @click="session.logout()">
        Logout
      </button>
    </div>

    <a href="/main" class="block w-200px">
      <img
        alt="RT logo"
        style="width: 200px"
        src="./img/logo2.png"
      >
    </a>

    <div id="menu" class="absolute w-full bottom-2 mb-2 px-5 text-center justify-center flex">
      <RouterLink to="/menu/movie" class="min-w-a mx-a color-white">
        Movie
      </RouterLink>
      <RouterLink to="/menu/action" class="min-w-a mx-a color-white">
        Action
      </RouterLink>
      <RouterLink to="/menu/drama" class="min-w-a mx-a color-white">
        Drama
      </RouterLink>
      <RouterLink to="/menu/romance" class="min-w-a mx-a color-white">
        Romance
      </RouterLink>
      <RouterLink to="/menu/comedy" class="min-w-a mx-a color-white">
        Comedy
      </RouterLink>
      <RouterLink to="/menu/ani" class="min-w-a mx-a color-white">
        Ani
      </RouterLink>
      <RouterLink to="/menu/horror" class="min-w-a mx-a color-white">
        Horror
      </RouterLink>
      <RouterLink to="/menu/sf" class="min-w-a mx-a color-white">
        SF
      </RouterLink>
      <RouterLink to="/menu/fantasy" class="min-w-a mx-a color-white">
        Fantasy
      </RouterLink>
      <RouterLink to="/menu/etc" class="min-w-a mx-a color-white">
        Etc
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss">
.background {
  height: 45vh;
  min-height: 300px;
  overflow: hidden;
  background-image: url("./img/header.jpg");
  background-size: cover;
  background-size: no-repeat;
  background-position: center;
}
.logo {
  padding-left: 50px;
}
</style>
