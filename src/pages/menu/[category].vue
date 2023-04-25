<script setup>
const props = defineProps({
  category: { type: String, required: true },
})
const route = useRoute()
const router = useRouter()
const path = route.params.category
onMounted(() => router.push(`/movielist/${path}`))
</script>

<template>
  <div />
</template>

<style></style>
