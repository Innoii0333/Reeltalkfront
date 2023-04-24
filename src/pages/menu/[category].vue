<script setup>
const route = useRoute()
const router = useRouter()
const path = route.params.category
onMounted(() => router.push(`/movielist/${path}`))
</script>

<template>
  <div />
</template>
