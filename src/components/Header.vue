<script setup lang="ts">
const session = useSessionStore()
const openLogin = () => {
  window.open('/login', 'loginWindow',
   `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)
}
const openSignup = () => {
  window.open('/signup', 'signupWindow',
  `width=900,height=500,left=${window.screen.width / 2 - 450},top=${window.screen.height / 2 - 250}`)
}
const receiveChild = async (data) => {
  // 전달받은 데이터 처리
  console.log('Received data from child:', data)
  // 자식 창으로 메시지 전송
  window.postMessage({ message: 'received' }, '*')
  try { await session.checkLogin() }
  catch { alert('로그인에 실패했습니다') }
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
