<script setup>

const items = [
  { image: '../../components/img/alt.png', description: 'description 1' },
  { image: '../../components/img/alt.png', description: 'description 2' },
  { image: '../../components/img/alt.png', description: 'description 3' },
  { image: '../../components/img/alt.png', description: 'description 4' },
  { image: '../../components/img/alt.png', description: 'description 5' },
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

// 통계 입력 부분
const labels1 = ['movie1', 'movie2', 'movie3', 'movie4', 'movie5']
const data1 = [21, 35, 18, 25, 32]

const labels2 = ['movie6', 'movie7', 'movie8', 'movie9', 'movie10']
const data2 = [14, 29, 36, 21, 27]

const labels3 = ['genre1', 'genre2', 'genre3', 'genre4', 'genre5']
const data3 = [40, 32, 25, 20, 15]

// 게시물
const movieItems = [
  { id: 1, title: 'Movie Item 1', link: '/movies/1' },
  { id: 2, title: 'Movie Item 2', link: '/movies/2' },
  { id: 3, title: 'Movie Item 3', link: '/movies/3' },
  { id: 4, title: 'Movie Item 4', link: '/movies/4' },
  { id: 5, title: 'Movie Item 5', link: '/movies/5' },
]

const postItems = [
  { id: 1, title: 'Post Item 1', link: '/posts/1' },
  { id: 2, title: 'Post Item 2', link: '/posts/2' },
  { id: 3, title: 'Post Item 3', link: '/posts/3' },
  { id: 4, title: 'Post Item 4', link: '/posts/4' },
  { id: 5, title: 'Post Item 5', link: '/posts/5' },
]
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <ElCarousel :interval="4000" arrow="always">
      <ElCarouselItem v-for="(item, index) in items" :key="index">
        <img :src="item.image" alt="item.description" @error="item.image = '/src/components/img/alt.png'">
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
      style="width: 30%; height: 330px; background-color: white; margin-left:18%; margin-right: 2%; border: solid;
      border-top-width: 1px; border-left-width: 1px; border-bottom-right-width:3px; display: flex; flex-direction: column; justify-content: center;"
    >
      <div style="display: flex; align-items: center;">
        <img alt="Hot Movie" src="../../components/img/req5.png" style="width: 7%; height: auto; margin: 10px;">
        <div style="margin-left: 10px;">
          HOT Movie
        </div>
      </div>
      <div>
        <ul style="text-align: left; padding-left: 30px;">
          <li v-for="item in movieItems" :key="item.id" style="margin-top: 22px;">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    <div
      style="width: 30%; height: 330px; background-color: white; margin-left: 2%; margin-right: 18%; border: solid;
      border-top-width: 1px; border-left-width: 1px; border-bottom-right-width:3px; display: flex; flex-direction: column; justify-content: center;"
    >
      <div style="display: flex; align-items: center;">
        <img alt="Hot Post" src="../../components/img/rep3.png" style="width: 6%; height: auto; margin: 10px;">
        <div style="margin-left: 10px;">
          HOT Post
        </div>
      </div>
      <div>
        <ul style="text-align: left; padding-left: 30px;">
          <li v-for="item in postItems" :key="item.id" style="margin-top: 22px;">
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="charts-container">
    <div class="chart">
      <h1>Weelky Movie</h1>
      <BarChart :labels="labels1" :data="data1" />
    </div>
    <div class="chart">
      <h1>Monthly Movie</h1>
      <BarChart2 :labels="labels2" :data="data2" />
    </div>
  </div>
  <div class="piechart">
    <h1>Popular Genre</h1>
    <PieChart :labels="labels3" :data="data3" />
  </div>
  <RouterView />
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

.charts-container {
  display: flex;
  justify-content: space-between;
  padding: 80px 270px;
  font-size: 30px;
}
.piechart{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

.chart {
  width: 45%;
  margin: 0 30px;
}

.chart:first-child {
  margin-left: 50px;
}

.chart:last-child {
  margin-right: 50px;
}
</style>
