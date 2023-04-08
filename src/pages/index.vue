<script setup lang="ts">
import { useCategoryId } from '~/store/category'

const category = useCategoryId()
const genre = $ref(category.savedGenre)

const router = useRouter()
const go = () => {
  if (genre)
    router.push(`/movielist/${encodeURIComponent(genre)}`)
}

const { t } = useI18n()
</script>

<template>
  <div />
</template>

<route lang="yaml">
meta:
  layout: home
</route>
