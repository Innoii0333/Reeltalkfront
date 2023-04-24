<script setup lang="ts">
const session = useSessionStore()
const isLoggedIn = ref(false)
const openLogin = () => {
  const loginWindow = window.open('/login', 'loginWindow',
   `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)

  window.addEventListener('message', async (event) => {
    if (event.origin !== window.location.origin)
      return // 보안을 위한 체크
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
  console.log (session.checkLogin())
  console.log (session.isLoggedIn)
})

// const router = useRouter()
// const getUser = () => {
//   // console.log(session.user_id, session.user_name)
//   router.push('/chat')
// }
</script>

<template>
  <div class="background relative">
    <div style="color: white; margin-top: 5px; float: right">
      <button v-if="!isLoggedIn" class="menu" @click="openLogin">
        Sign in
      </button>
      <span class="mx-1">|</span>
      <button class="menu" style="margin-right:10px" @click="openSignup">
        Sign up
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
      <RouterLink to="/movielist/movie" class="min-w-a mx-a color-white">
        Movie
      </RouterLink>
      <RouterLink to="/movielist/action" class="min-w-a mx-a color-white">
        Action
      </RouterLink>
      <RouterLink to="/movielist/drama" class="min-w-a mx-a color-white">
        Drama
      </RouterLink>
      <RouterLink to="/movielist/romance" class="min-w-a mx-a color-white">
        Romance
      </RouterLink>
      <RouterLink to="/movielist/comedy" class="min-w-a mx-a color-white">
        Comedy
      </RouterLink>
      <RouterLink to="/movielist/ani" class="min-w-a mx-a color-white">
        Ani
      </RouterLink>
      <RouterLink to="/movielist/horror" class="min-w-a mx-a color-white">
        Horror
      </RouterLink>
      <RouterLink to="/movielist/sf" class="min-w-a mx-a color-white">
        SF
      </RouterLink>
      <RouterLink to="/movielist/fantasy" class="min-w-a mx-a color-white">
        Fantasy
      </RouterLink>
      <RouterLink to="/movielist/etc" class="min-w-a mx-a color-white">
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
