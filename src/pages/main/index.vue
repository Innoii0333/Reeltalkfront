<script setup>

const items = [
  { image: 'https://example.com/image1.jpg', description: 'description 1' },
  { image: 'https://example.com/image2.jpg', description: 'description 2' },
  { image: 'https://example.com/image3.jpg', description: 'description 3' },
  { image: 'https://example.com/image4.jpg', description: 'description 4' },
  { image: 'https://example.com/image5.jpg', description: 'description 5' },
]

function handleImageClick(item) {
  console.log(`Clicked on ${item.text}`)
}

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
    <ElCarousel :interval="4000" arrow="always">
      <ElCarouselItem v-for="(item, index) in items" :key="index">
        <img :src="item.image" alt="item.description">
      </ElCarouselItem>
    </ElCarousel>
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

    <RouterView />
  </div>
</template>

<style lang="scss">
.carousel-item-wrapper {
  position: relative;
  display: inline-block;
}

.carousel-item-text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  padding: 16px;
}
</style>
