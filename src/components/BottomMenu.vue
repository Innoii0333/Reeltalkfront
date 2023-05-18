<script setup>
const router = useRouter()
const isDark = ref(false)
const goToTop = () => {
  document.querySelector('main').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}
const toggleDark = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  if (isDark.value)
    localStorage.setItem('reeltalk-color-scheme', 'dark')
  else localStorage.setItem('reeltalk-color-scheme', 'light')
}
const openChatLive = () => {
  router.push('/chat')
    .then(() => ElMessage({ type: 'info', message: '대화방으로 이동합니다' }))
    .catch(() => ElMessage({ type: 'error', message: '대화방 입장에 실패했습니다' }))
}
onMounted(() => {
  isDark.value = document.querySelector('dark') !== null
})
</script>

<template>
  <div class="fixed bottom-5 right-5 inline gap-x-4 z-20 text-white">
    <button class="min-w-fit bg-gray mx-1 w-35.2px h-35.2px" @click="openChatLive">
      <img src="/src/components/img/opentalk.png" alt="chat" width="35.2" class="object-cover">
    </button>
    <button class="min-w-fit bg-gray p-2 mx-1" @click="toggleDark">
      <div i="carbon-sun dark:carbon-moon text-center" />
    </button>
    <button class="min-w-fit bg-gray p-2 mx-1 items-center" @click="goToTop">
      <div i="carbon-chevron-up text-center" />
    </button>
  </div>
</template>
