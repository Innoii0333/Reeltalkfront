<script setup>
import { onMounted, ref } from 'vue'

function openNewWindow() {
  const windowFeatures = {
    width: 600,
    height: 900,
    left: (window.screen.width - 600) / 2,
    top: (window.screen.height - 900) / 2,
  }
  const newWindow = window.open('http://localhost:3334/opentalk', '_blank', Object.entries(windowFeatures).map(e => `${e[0]}=${e[1]}`).join(','))
  if (newWindow)
    newWindow.focus()
}
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <div style="text-align: center;">
      <img alt="Movie Poster" src="../../components/img/movie1.jpg" style="width: 100%; max-width: 1350px; margin: 0 auto;">
    </div>
    <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
      <button id="openTalkButton" @click="openNewWindow">
        <img src="../../components/img/opentalk.png" alt="버튼 이미지" style="width: 50%; height: auto; margin-left: 20px;">
      </button>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <div
        style="width: 30%; height: 300px; background-color: white; margin-left:18%; margin-right: 2%; border: solid;
    border-top-width: 1px; border-left-width: 1px; border-bottom-right-width:3px; display: flex; align-items: center;"
      >
        <img alt="Hot Movie" src="../../components/img/req5.png" style="width: 7%; height: auto; margin: 10px;">
        <div>HOT Movie</div>
      </div>
      <div
        style="width: 30%; height: 300px; background-color: white; margin-left: 2%; margin-right: 18%; border: solid;
    border-top-width: 1px; border-left-width: 1px; border-bottom-right-width:3px; display: flex; align-items: center;"
      >
        <img alt="Hot Post" src="../../components/img/rep3.png" style="width: 6%; height: auto; margin: 10px;">
        <div>HOT Post</div>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<style lang="scss">
</style>
