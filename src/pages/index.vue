<script setup lang="ts">
const router = useRouter()

onMounted(() => setTimeout(() => {
  router.push('/main')
}, 3000))
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
