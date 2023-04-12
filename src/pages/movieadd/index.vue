<script setup>
import axios from 'axios'

const router = useRouter()
const searchInfo = ref(null)
const movieInfo = ref(null)
const keyword = ref('검색')
const isActive = ref(false)

const goBack = () => {
  router.back()
}
const getMovie = async (keyword) => {
  try {
    // const res = await axios.get(`/api/movieadd?title=${keyword}`)
    const res = await axios.get('http://localhost:3000/kmdbResult')
    searchInfo.value = res.data[0].Result
    for (const titles of searchInfo.value) {
      const title = titles.title
      titles.title = title.replace(/\s!HS\s/g, '').replace(/\s!HE\s/g, '').trim()
    }
  }
  catch (e) {
    // 서버 전송 실패의 처리
    console.error('서버 요청 실패:', e)
    alert('영화 api 조회에 실패하였습니다 다시 시도해 보세요')
  }
}
const handleCardActive = (index) => {
  isActive.value = (isActive.value === index) ? false : index
  movieInfo.value = searchInfo.value[index]
  console.log(movieInfo.value.DOCID)
  console.log(movieInfo.value.title)
  console.log(movieInfo.value.genre)
  console.log(movieInfo.value.repRlsDate)
  console.log(movieInfo.value.actors.actor[0].actorNm)
  console.log(movieInfo.value.plots.plot[0].plotText)
  console.log(movieInfo.value.directors.director[0].directorNm)
  console.log(movieInfo.value.rating)
  console.log(movieInfo.value.posters)
}
const submitMovie = async () => {
  const formData = new FormData()
  let actor = ''
  formData.append('movie_id', movieInfo.value.DOCID)
  formData.append('title', movieInfo.value.title)
  formData.append('category_id', movieInfo.value.genre)
  formData.append('release_date', movieInfo.value.repRlsDate)
  formData.append('plot', movieInfo.value.plots.plot[0].plotText)
  for (let idx = 0; idx < min(4, movieInfo.value.actors.actor.length()); idx++) {
    if (idx !== 0)
      actor += '/'
    actor += movieInfo.value.actors.actor[idx].actorNm
  }
  formData.append('actor_nm', actor)
  formData.append('director_nm', movieInfo.value.directors.director[0].directorNm)
  formData.append('rating', movieInfo.value.rating)
  formData.append('poster', movieInfo.value.posters)
  try {
    const res = await axios.post('/api/movieadd', formData)
    router.push('/main')
  }
  catch (e) {
    // 서버 전송 실패의 처리
    console.error('서버 요청 실패:', e)
    alert('영화 등록에 실패하였습니다 다시 시도해 보세요')
  }
}
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
      <input v-model="keyword" type="text" class="border-rtgray px-1 my-1 w-50" @keyup.enter="getMovie(keyword)">
      <button>
        <img
          src="/src/components/img/finder.png" alt="검색" width="24" style="margin-top: -2.8px;"
          outline="solid 1.5px #c0c0c0" inline-block @click="getMovie(keyword)"
        >
      </button>
    </span>
  </div>
  <div>
    <p>
      v-for 이용한 카드형식 리스트 출력
    </p>
    <div class="w-2xl mx-auto my-3">
      <el-row :gutter="20">
        <el-col
          v-for="(o, index) in searchInfo"
          :key="index"
          class="mb-8"
          :span="6"
        >
          <el-card :body-style="{ padding: '3px', border: isActive === index ? '2px solid #151AA3' : 'none' }" @click="handleCardActive(index)">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="card-image"
            >
            <div class="text-left">
              <p>moviename</p>
              <p>date</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <hr class="w-2xl border-black border-1.5 my-2 mx-auto">
    <div class="w-2xl text-right mx-auto">
      <el-button color="#c0c0c0" @click="goBack">
        뒤로가기
      </el-button>
      <el-button color="#151AA3" class="text-white">
        등록하기
      </el-button>
    </div>
  </div>
</template>

<style lang="scss">
.image {
  width: 50%;
  display: block;
}
input.border-rtgray{
  outline-style: solid;
  outline-width: 1.5px;
  outline-color:#c0c0c0;
}
</style>

