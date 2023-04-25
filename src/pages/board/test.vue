<script setup>
const router = useRouter()
const isLoading = ref(0)
const pages = ref(0)
const intersectionTarget = ref(null)
let observer = null

const newWindow = () => {
  const childWindow = window.open('/board/test2', 'example', 'width=500,height=500')

  window.addEventListener('message', (event) => {
    console.log('Received message:', event.data.message)
    if (event.origin !== window.location.origin)
      return // 보안을 위한 체크
    if (event.source !== childWindow)
      return
    if (event.data.message === 'session_ready') { childWindow.postMessage({ message: 'give-me-data' }) }
    else if (event.data) {
      console.log(event.data)
      childWindow.postMessage({ message: 'received' })
    }
  })
}

const tableData = ref([
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
  { id: 1, title: 'Movie 1', poster_url: '/src/components/img/1.png', release_date: '2022-01-01', star_avg_rate: 4.5, category_id: [1, 2] },
  { id: 2, title: 'Movie 2', poster_url: '/src/components/img/2.png', release_date: '2022-01-02', star_avg_rate: 3.5, category_id: [2, 3] },
  { id: 3, title: 'Movie 3', poster_url: '/src/components/img/3.png', release_date: '2022-01-03', star_avg_rate: 4.0, category_id: [1, 3] },
  { id: 4, title: 'Movie 4', poster_url: '/src/components/img/4.png', release_date: '2022-01-04', star_avg_rate: 5.0, category_id: [2] },
  { id: 5, title: 'Movie 5', poster_url: '/src/components/img/5.png', release_date: '2022-01-05', star_avg_rate: 2.0, category_id: [1] },
])

const filteredMovies = ref([])
const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0.3,
}
const getMovies = async (pages) => {
  console.log('getmovies', pages)
  isLoading.value = 1
  const newMovies = await tableData.value.slice(pages * 4, pages * 4 + 4)
  filteredMovies.value = filteredMovies.value.concat(newMovies)
  isLoading.value = 0
  if (newMovies.length === 0) {
    console.log('no more page')
    isLoading.value = -1
  }
}
const handleIntersect = async (entries, observer) => {
  console.log(intersectionTarget.value)
  console.log(entries[0])
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
  console.log(observer)
})
onBeforeUnmount(() => {
  observer.unobserve(intersectionTarget.value)
})
</script>

<template>
  <table class="my-10 table-fixed items-center">
    <tr>
      <td class="min-w-xl text-right">
        <img src="/src/components/img/alt.png" class="object-fill inline-block px-5" @error="poster_url.value = '/src/components/img/alt.png' ">
      </td>
      <td class="min-w-xl mx-5 px-5 text-left">
        11124141414141231313<br>12414141<br>1414141<br>12414141414
      </td>
    </tr>
  </table>
  <div>
    <ul class="max-w-2xl my-5 mx-auto text-16px">
      <li class="ml-3 px-2 inline-block">
        <div class="flex">
          <span class="basis-15 px-2 text-left">
            aaaa
          </span>
          <span class="flex-1  mx-5 text-left">
            bbbbbb
          </span>
          <span class="basis-15 mx-3 pr-2">
            ccccccccc
          </span>
          <span class="basis-10 mx-1 px-2 whitespace-nowrap">
            <button class="mx-1 inline-block">
              <img class="inline-block" src="/src/components/img/rep2.png" inline-block>
            </button>
            <button class="mx-1 inline-block">
              <img class="inline-block" src="/src/components/img/rep3.png" inline-block>
            </button>
            <button class="mx-1 inline-block">
              <img class="inline-block" src="/src/components/img/rep4.png" inline-block>
            </button>
          </span>
        </div>
      </li>
      <li class="ml-3 px-2 inline-block">
        <div class="flex">
          <img class="ml-1 pl-1 w-5.4 justify-center mt-1.8" inline-block src="/src/components/img/rep1.png">
          <span class="basis-15 px-2 text-left">
            aaaa
          </span>
          <span class="flex-1 mx-5 text-left">
            bbbbbb
          </span>
          <span class="basis-15 mx-3 pr-2">
            ccccccccc
          </span>
          <span class="basis-10 mx-1 px-2 whitespace-nowrap">
            <button class="mx-1 inline-block">
              <img class="inline-block" src="/src/components/img/rep3.png" inline-block>
            </button>
            <button class="mx-1 inline-block">
              <img class="inline-block" src="/src/components/img/rep4.png" inline-block>
            </button>
          </span>
        </div>
      </li>
    </ul>
    <div class="inline-block flex justify-center items-center">
      <textarea class="border-0.5 border-black px-1 py-1 my-2 mr-0 ml-auto min-w-xl max-w-2xl text-3 leading-normal" />
      <el-button color="#151AA3" class="text-white bg-rtblue ml-2 mr-0" @click="newWindow">
        수정
      </el-button>
      <el-button color="#c0c0c0" class="bg-rtgray ml-2 mr-auto">
        취소
      </el-button>
    </div>
  </div>
  <div>
    <el-row :gutter="20">
      <el-col v-for="(movieCard, index) in filteredMovies" :key="index" class="mb-8" :span="6">
        <el-card :body-style="{ padding: '3px' }" @click="goMovieBoard(movieCard.movie_id)">
          <button>
            <el-image
              :key="index" :src="movieCard.poster_url" class="object-cover"
              @error.once="movieCard.poster_url = '/src/components/img/alt.png'"
            />
            <div class="text-left text-sm">
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

<route lang="yaml">
meta:
  layout: onlyheader
</route>

