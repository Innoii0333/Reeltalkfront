<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div class="bg-black text-white w-full mx-auto px-2 py-2 text-left">
    <h1>Footer</h1>
    <p>
      Reeltalks 개인정보 취급 방침
    </p>
    <p>
      ~~~~
    </p>
    <p>
      CopyRight 2023. Reeltalks team. All right reserved.
    </p>
  </div>
</template>
