<script setup lang="ts">
const router = useRouter()

// 4초 뒤에 '/main' 페이지로 이동하는 함수
setTimeout(() => {
  router.push('/main')
}, 4000)
</script>

<template>
  <div style="width:100%; height:auto;">
    <img src="/src/components/img/welcome.gif" alt="Welcome GIF">
  </div>
</template>

<route lang="yaml">
meta:
  layout: bare
</route>
