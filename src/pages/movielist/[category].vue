<script setup>
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const category = route.params.category
const tableData = ref([])
const filteredMovies = ref([])
const keyword = ref('')
const isLoading = ref(0)
const pages = ref(1)

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0.3,
}

const getMovies = async (n) => {
  isLoading.value = 1
  try {
    const res = await axios.get(`/api/movieList/${category}?page=${n}`)
    tableData.value = tableData.value.concat(res)
    isLoading.value = 0
    if (res.data.length === 0)
      isLoading.value = -1
  }
  catch (e) {
    console.error(e)
    alert('영화 목록 조회에 실패했습니다')
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
const titleSearch = () => {
  if (keyword.value === '') { filteredMovies.value = tableData.value }
  else {
    const lowerCaseKeyword = keyword.value.toLowerCase()
    filteredMovies.value = tableData.value.filter(movie =>
      movie.title.toLowerCase().includes(lowerCaseKeyword),
    )
  }
}
const goMovieBoard = (movieId) => {
  router.push(`/board/list/${movieId}`)
}

onMounted(async () => {
  await getMovies(pages.value)
  observer = new IntersectionObserver(handleIntersect, options)
  observer.observe(intersectionTarget.value)
})
onUnmounted(() => {
  observer.unobserve(intersectionTarget.value)
})
</script>

<template>
  <div class="ml-3 px-auto text-left">
    {{ category }}
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
    <el-row class="min-h-sm" :gutter="20">
      <el-col
        v-for="(movieCard, index) in filteredMovies"
        :key="index"
        class="mb-8"
        :span="6"
      >
        <el-card :body-style="{ padding: '3px' }" @click="goMovieBoard(movieCard.movie_id)">
          <button>
            <el-image
              :src="movieCard.poster_url" class="object-cover"
              @error="movieCard.poster_url = '/src/components/img/alt.png'"
            />
            <div class="text-left text-xs">
              <p> {{ movieCard.title }} </p>
              <p> {{ movieCard.release_date }} </p>
              <p> {{ movieCard.star_avg_rate }}</p>
              <p> <span v-for="{ exCategory, idx } in movieCard.category_id" :key="idx">#{{ exCategory }}</span></p>
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

