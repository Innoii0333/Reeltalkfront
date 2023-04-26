<script setup>
import axios from 'axios'
const router = useRouter()
const boxOfficeList = ref([])
const hotMovieList = ref([])
const hotPostList = ref([])
const labels1 = ref([])
const data1 = ref([])
const labels2 = ref([])
const data2 = ref([])
const labels3 = ref([])
const data3 = ref([])
const hotMovieData = ref([])

function openNewWindow() {
  // const windowFeatures = {
  //   width: 600,
  //   height: 900,
  //   left: (window.screen.width - 600) / 2,
  //   top: (window.screen.height - 900) / 2,
  // }
  // const newWindow = window.open('/chat', '_blank', Object.entries(windowFeatures).map(e => `${e[0]}=${e[1]}`).join(','))
  // if (newWindow)
  //   newWindow.focus()
  router.push('/chat').then(() => {
    console.log('Navigated to /chat')
  }).catch((err) => {
    console.log('Error navigating to /chat:', err)
  })
}

// 통계 입력 부분

function handleImageClick(item) {
  router.push(`/board/list/${item.movie_id}`)
  // console.log(`Clicked on ${item.movie_id}`)
}

const getMainPageData = async () => {
  try {
    const result = await axios.get('/api/main')

    // box office list
    boxOfficeList.value = result.data.boxOffice
    console.log('Box Office List:', boxOfficeList.value)

    // Log image URLs
    boxOfficeList.value.forEach((boxOffice) => {
      console.log('Image URL:', boxOffice.imageLink)
    })
    // hot movie list
    const hotMovieResult = await axios.get('/api/hotMovie/7')
    //   console.log('hot Movie : ', hotMovieResult)
    hotMovieData.value = hotMovieResult.data
    const sortedHotMovies = hotMovieData.value?.sort((a, b) => b.postCount - a.postCount).slice(0, 5)
    hotMovieList.value = sortedHotMovies.length > 0 ? sortedHotMovies : [hotMovieData.value[0]]

    // hot post list
    const hotPostResult = await axios.get('/api/hotPost/7')
    //   console.log('hot Post : ', hotPostResult)
    const hotPostData = hotPostResult.data
    const sortedHotPosts = hotPostData.sort((a, b) => b.replyCount - a.replyCount).slice(0, 5)
    hotPostList.value = sortedHotPosts.length > 0 ? sortedHotPosts : [hotPostData[0]]

    // 통계 데이터 가져오기
    const postResult = await axios.get('/api/statisticsPost/7')
    const replyResult = await axios.get('/api/statisticsReply/30')
    const genreResult = await axios.get('/api/statisticsGenre/30')

    if (postResult.data.length === 0) {
      ElMessage({ type: 'error', message: '인기 영화에 대한 통계 데이터가 없습니다' })
    }
    else {
      //     console.log('Post Result:', postResult.data)
      labels1.value = postResult.data.map(item => item.stat_name)
      data1.value = postResult.data.map(item => item.stat_count)
      //      console.log(labels1, data1)
    }

    if (replyResult.data.length === 0) {
      ElMessage({ type: 'error', message: '인기 게시물에 대한 통계 데이터가 없습니다' })
    }
    else {
      labels2.value = replyResult.data.map(item => item.stat_name)
      data2.value = replyResult.data.map(item => item.stat_count)
    }

    if (genreResult.data.length === 0) {
      ElMessage({ type: 'error', message: '인기 장르에 대한 통계 데이터가 없습니다' })
    }
    else {
      labels3.value = genreResult.data.map(item => item.stat_name)
      data3.value = genreResult.data.map(item => item.stat_count)
    }
  }
  catch (e) {
    console.error(e)
  }
}

onMounted(async () => await getMainPageData())
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <ElCarousel :interval="4000" arrow="always">
      <ElCarouselItem v-for="(boxOffices, boxOfficeOrder) in boxOfficeList" :key="boxOfficeOrder" style="display: flex; flex-direction: column; min-height: 400px;" @click="handleImageClick(boxOffices)">
        <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: auto;">
          <img :src="boxOffices.imageLink" alt="item.description" style="width: auto; height: auto; max-width: 100%; max-height: 100%;" :style="{ 'width': '200px', 'height': '300px', 'object-fit': 'cover' }" @error="boxOffices.imageLink = '/src/components/img/alt.png'">
        </div>
        <div>
          제 목 : {{ boxOffices.title }}
        </div>
        <div>
          감 독 : {{ boxOffices.director_Nm }}
        </div>
        <div>
          개봉일 : {{ boxOffices.release_Date }}
        </div>
        <div v-if="boxOffices.category_Id_list">
          <span v-for="(category, i) in boxOffices.category_Id_list" :key="i"># {{ category }}</span>
        </div>
      </ElCarouselItem>
    </ElCarousel>
  </div>

  <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
    <button id="openTalkButton" @click="openNewWindow">
      <img src="/src/components/img/opentalk.png" alt="버튼 이미지" style="width: 50%; height: auto; margin-left: 20px;">
    </button>
  </div>

  <div style="display: flex; justify-content: space-between; margin-top:50px;">
    <div
      style="width: 30%; height: 330px; background-color: white; margin-left:12%; margin-right: 2%; border: solid;
      border-top-width: 1px; border-left-width: 1px; border-bottom-right-width:3px; display: flex; flex-direction: column; "
    >
      <div style="display: flex; align-items: center;">
        <img alt="Hot Movie" src="/src/components/img/req5.png" style="width: 7%; height: auto; margin: 10px;">
        <div style="margin-left: 10px;">
          HOT Movie
        </div>
      </div>
      <div>
        <!-- 핫 무비 템플릿 -->
        <ul style="text-align: left; padding-left: 30px;">
          <li v-for="(item, index) in hotMovieList" :key="item.movie_id" style="margin-top: 22px;">
            <router-link :to="{ path: `/board/list/${item.movie_id}` }">
              {{ parseInt(index) + 1 }}. {{ item.title }}
            </router-link>
          </li>
        </ul>
        <div v-if="!hotMovieList || hotMovieList.length === 0" style="text-align: center;">
          현재 등록된 핫 무비가 없습니다.
        </div>
      </div>
    </div>
    <div
      style="width: 30%; height: 330px; background-color: white; margin-left: 2%; margin-right: 18%; border: solid;
      border-top-width: 1px; border-left-width: 1px; border-bottom-right-width:3px; display: flex; flex-direction: column; "
    >
      <div style="display: flex; align-items: center;">
        <img alt="Hot Post" src="/src/components/img/rep3.png" style="width: 6%; height: auto; margin: 10px;">
        <div style="margin-left: 10px;">
          HOT Post
        </div>
      </div>
      <div>
        <!-- 핫 포스트 템플릿 -->
        <ul style="text-align: left; padding-left: 30px;">
          <li v-for="(item, index) in hotPostList" :key="item.post_id" style="margin-top: 22px;">
            <router-link :to="{ path: `/board/post/${item.movie_id}/${item.post_id}` }">
              {{ parseInt(index) + 1 }}. {{ item.post_Title }}
            </router-link>
          </li>
        </ul>
        <div v-if="!hotPostList || hotPostList.length === 0" style="text-align: center;">
          현재 등록된 핫 포스트가 없습니다.
        </div>
      </div>
    </div>
  </div>

  <!-- 차트 -->
  <div class="charts-container">
    <div class="chart">
      <h1>Weekly Movie</h1>
      <div v-if="!data1 || data1.length === 0">
        현재 등록된 게시물이 없습니다.
      </div>
      <div v-else>
        <BarChart :labels="labels1" :data="data1" />
      </div>
    </div>
    <div class="chart">
      <h1>Monthly Movie</h1>
      <div v-if="!data2 || data2.length === 0">
        현재 등록된 게시물이 없습니다.
      </div>
      <div v-else>
        <BarChart2 :labels="labels2" :data="data2" />
      </div>
    </div>
  </div>
  <div class="piechart">
    <h1>Popular Genre</h1>
    <div v-if="!data3 || data3.length === 0">
      현재 등록된 게시물이 없습니다.
    </div>
    <div v-else>
      <PieChart :labels="labels3" :data="data3" />
    </div>
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

.charts-container {
  display: flex;
  justify-content: space-between;
  padding: 80px 80px;
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
  margin-left: 20px;
}

.chart:last-child {
  margin-right: 30px;
}
</style>

<route lang="yaml">
meta:
  layout: home
    </route>
