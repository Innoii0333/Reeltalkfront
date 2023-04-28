<script setup>
import axios from 'axios'
const session = useSessionStore()
const router = useRouter()
const searchInfo = ref(null)
const movieInfo = ref(null)
const keyword = ref('')
const isActive = ref(false)
const ADMIN_ID = ['hin2520', 'susu4334', 'alsdnr0501', 'you3849', 'wonffo24', 'juseon5469', 'lsangm0513']

const goBack = () => {
  router.replace('/error')
}
const getMovie = async () => {
  let i = 0
  try {
    const res = await axios.get(
      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&listCount=100&ServiceKey=0M1CRMOD0W2RFMSLVG1G&title=${keyword.value}`,
    )
    searchInfo.value = res.data.Data[0].Result
    for (const titles of searchInfo.value) {
      const poster = titles.posters
      titles.posters = poster.replace(/\|.*/, '')
      const title = titles.title
      titles.title = title.replace(/\s!HS\s/g, '').replace(/\s!HE\s/g, '').trim()
      i++
    }
    ElMessage({ type: 'info', message: `${i}개의 결과가 검색되었습니다` })
  }
  catch (e) {
    console.error('서버 요청 실패:', e)
    ElMessage({ type: 'error', message: '영화 조회에 실패하였습니다 다시 시도해 보세요' })
  }
}
const handleCardActive = (index) => {
  isActive.value = (isActive.value === index) ? false : index
  movieInfo.value = searchInfo.value[index]
}

const submitMovie = async () => {
  const formData = new FormData()
  let actor = ''
  formData.append('movie_id', movieInfo.value.DOCID)
  formData.append('title', movieInfo.value.title)
  formData.append('category_id', movieInfo.value.genre)
  formData.append('release_date', movieInfo.value.repRlsDate)
  formData.append('plot', movieInfo.value.plots.plot[0].plotText)
  for (let idx = 0; idx < Math.min(4, movieInfo.value.actors.actor.length); idx++) {
    if (idx !== 0)
      actor += '/'
    actor += movieInfo.value.actors.actor[idx].actorNm
  }
  formData.append('actor_nm', actor)
  formData.append('director_nm', movieInfo.value.directors.director[0].directorNm)
  formData.append('rating', movieInfo.value.rating)
  formData.append('poster', movieInfo.value.posters)
  try {
    const res = await axios.post('/api/movieadd', formData, { validateStatus: false })
    ElMessage({ type: 'success', message: '영화가 DB에 등록되었습니다' })
    router.push('/main')
  }
  catch (e) {
    console.error('서버 요청 실패:', e)
    ElMessage({ type: 'error', message: '영화 등록에 실패하였습니다 다시 시도해 보세요' })
  }
}
onMounted(async () => {
  await session.getSession()
  if (!ADMIN_ID.includes(session.user_id))
    goBack()
})
</script>

<template>
  <h1 class="w-2xl mx-auto text-xl text-left">
    영화 등록페이지
  </h1>
  <hr class="w-2xl border-black border-1.5 my-2 mx-auto">
  <div class="w-2xl text-left mx-auto px-3">
    <!-- 검색 옵션 -->
    <p class="text-xs">
      출처 - 한국영화데이터베이스(KMDb) (https://www.kmdb.or.kr/)
    </p>
    <span class="inline-block w-120 text-left">
      <input v-model="keyword" type="text" placeholder="검색" class="border-rtgray px-1 my-1 w-50" @keyup.enter="getMovie">
      <button>
        <img
          src="/src/components/img/finder.png" alt="go" width="24" style="margin-top: -2.8px;"
          outline="solid 1.5px #C0C0C0" inline-block @click="getMovie"
        >
      </button>
    </span>
  </div>
  <div>
    <div class="w-2xl mx-auto my-3 min-h-xs">
      <el-row :gutter="20">
        <el-col
          v-for="(movieCard, index) in searchInfo"
          :key="index"
          class="mb-8"
          :span="6"
        >
          <el-card :body-style="{ padding: '3px', border: isActive === index ? '2px solid #151AA3' : 'none' }" @click="handleCardActive(index)">
            <button>
              <el-image
                :src="movieCard.posters" class="object-cover h-220px"
                @error="movieCard.posters = 'https://reeltalk.p-e.kr/images/noimage.png'"
              />
              <div class="text-left text-xs">
                <p> {{ movieCard.title }} </p>
                <p> 개봉일: {{ movieCard.repRlsDate }} </p>
              </div>
            </button>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <hr class="w-2xl border-black border-1.5 my-2 mx-auto">
    <div class="w-2xl text-right mx-auto">
      <el-button color="#C0C0C0" class="bg-rtgray" @click="goBack">
        뒤로가기
      </el-button>
      <el-button color="#151AA3" class="text-white bg-rtblue" @click="submitMovie">
        등록하기
      </el-button>
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
