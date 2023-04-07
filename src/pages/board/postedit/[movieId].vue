<script setup>
import axios from 'axios'
import TextEditor from '~/components/TextEditor.vue'
const router = useRouter()
const route = useRoute()
const post_title = ref('제목을 입력하세요')
const post_id = route.query.postId
const title = ref('movietitle')
const star_rate = ref(0)
const user_id = ref('null')
const content = ref('')
const movie_id = route.params.movieId
const goBack = () => {
  // vue router를 활용해서 이전 페이지로 이동
  router.back()
}
const submitForm = () => {
  const formData = new FormData()
  formData.append('movie_id', movie_id)
  formData.append('post_title', post_title)
  formData.append('content', content.value)
  formData.append('star_rate', star_rate.value)
  formData.append('user_id', user_id.value)
  if (post_id) {
    formData.append('post_id', post_id)
    axios.put(`/api/movie/${movie_id}/post/${post_id}`, formData)
      .then(() => {
        // 성공적으로 서버로 전송된 경우의 처리
        router.push(`/board/list/${movie_id}`)
      })
      .catch((e) => {
        // 서버 전송 실패의 처리
        console.error('서버 요청 실패:', e)
        alert('게시물 수정에 실패하였습니다 다시 시도해 보세요')
      })
  }
  else {
    axios.post(`/api/movie/${movie_id}/post`, formData)
      .then(() => {
        // 성공적으로 서버로 전송된 경우의 처리
        router.push(`/board/list/${movie_id}`)
      })
      .catch((e) => {
        // 서버 전송 실패의 처리
        console.error('서버 요청 실패:', e)
        alert('게시물 등록에 실패하였습니다 다시 시도해 보세요')
      })
  }
}
</script>

<template>
  <div class="text-5 ml-3 px-auto text-left">
    <p v-if="post_id">
      Edit Post : {{ title }} 게시판
    </p>
    <p v-else>
      New Post : {{ title }} 게시판
    </p>
  </div>
  <hr class="border-rtblue my-2">
  <input v-model="post_title" type="text" class="w-full px-2 py-2 my-5 text-16px font-bold outline"><br>
  <TextEditor v-model="content" />
  <p class="w-full text-left mx-auto text-rtred">
    별점 :
    <el-rate v-model="star_rate" class="mx-1" show-score :colors="['#B5141C', '#B5141C', '#B5141C']" allow-half />
  </p>
  <div class="w-full text-right mx-auto">
    <el-button color="#c0c0c0" @click="goBack">
      뒤로가기
    </el-button>
    <el-button color="#151AA3" class="text-white" @click="submitForm">
      등록하기
    </el-button>
  </div>
</template>

<style lang="scss"></style>
