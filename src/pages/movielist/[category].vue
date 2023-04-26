<script setup>
import axios from 'axios'
const props = defineProps({
  category: { type: String, required: true },
})
const route = useRoute()
const router = useRouter()
const category = route.params.category
const tableData = ref([])
const keyword = ref('')
const isLoading = ref(0)
const pages = ref(1)
const intersectionTarget = ref(null)
const filteredTable = ref([])
let observer = null

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0.3,
}

const titleSearch = () => {
  if (keyword.value === '') { filteredTable.value = tableData.value }
  else {
    const lowerCaseKeyword = keyword.value.toLowerCase()
    filteredTable.value = tableData.value.filter(movie =>
      movie.title.toLowerCase().includes(lowerCaseKeyword),
    )
  }
}
const getMovies = async (n) => {
  isLoading.value = 1
  try {
    const res = await axios.get('/api/movieList', {
      params: {
        category_id: category,
        curPage: n,
      },
    })
    const res1 = res.data.map((item) => {
      const categories = item.category_id.split(' ')
      let newDate = ''
      if (item.release_date) {
        const date = new Date(item.release_date)
        newDate = `${date.getFullYear().toString()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      }
      const imageUrl = `https://reeltalks.p-e.kr/images/${item.movie_id}.png`
      return { ...item, release_date: newDate, category_id: categories, poster_url: imageUrl }
    })
    tableData.value = tableData.value.concat(res1)
    titleSearch()
    isLoading.value = 0
    if (res.data.length === 0)
      isLoading.value = -1
  }
  catch (e) {
    console.error(e)
    ElMessage({ type: 'error', message: '영화 목록 조회에 실패하였습니다' })
    isLoading.value = -1
  }
}
const handleIntersect = async (entries, observer) => {
  if (entries[0].isIntersecting) {
    observer.unobserve(intersectionTarget.value)
    pages.value++
    await getMovies(pages.value)
  }
  if (isLoading.value === 0)
    observer.observe(intersectionTarget.value)
}

const goMovieBoard = (movieId) => {
  router.push(`/board/list/${movieId}`)
}

onMounted(async () => {
  await getMovies(pages.value)
  observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(intersectionTarget.value)
})
onBeforeUnmount(() => {
  observer.unobserve(intersectionTarget.value)
})
</script>

<template>
  <div class="ml-3 px-auto text-left text-10">
    {{ category.toLocaleUpperCase() }}
  </div>
  <div class="text-right">
    <!-- 검색 옵션 -->
    <span class="inline-block w-120 text-right">
      <input v-model="keyword" type="text" placeholder="검색" class="border-rtgray px-1 my-1 w-50" @keyup.enter="titleSearch">
      <button>
        <img
          src="/src/components/img/finder.png" alt="go" width="24" style="margin-top: -2.8px;"
          outline="solid 1.5px #c0c0c0" inline-block @click="titleSearch"
        > </button>
    </span>
  </div>
  <hr class="border-rtblue my-2">
  <!-- 카드 요소를 이용한 데이터 출력 및 infinite scrolling -->
  <div>
    <el-row class="min-h-xl" :gutter="20">
      <el-col
        v-for="(movieCard, index) in filteredTable"
        :key="index"
        class="mb-8"
        :span="6"
      >
        <el-card :body-style="{ padding: '3px', height: '100%' }" @click="goMovieBoard(movieCard.movie_id)">
          <button>
            <el-image
              :src="movieCard.poster_url" class="object-cover"
              @error="movieCard.poster_url = '/src/components/img/alt.png'"
            />
            <div class="text-left text-xs">
              <p> {{ movieCard.title }} </p>
              <p> {{ movieCard.release_date }} </p>
              <p> {{ movieCard.star_avg_rate }}</p>
              <p> <span v-for="(exCategory, idx) in movieCard.category_id" :key="idx">{{ exCategory }}&nbsp;</span></p>
            </div>
          </button>
        </el-card>
      </el-col>
    </el-row>
    <div ref="intersectionTarget">
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
input.border-rtgray{
  outline-style: solid;
  outline-width: 1.5px;
  outline-color:#c0c0c0;
}
</style>

<route lang="yaml">
meta:
  layout: onlyheader
    </route>

