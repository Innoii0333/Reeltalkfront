<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    {{ t('unauthorized') }}
    <div>
      <button btn text-sm m="3 t8" @click="router.push('/main')">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: bare
    </route>
