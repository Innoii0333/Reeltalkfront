<script setup>
import axios from 'axios'
import { onBeforeRouteLeave } from 'vue-router'
const props = defineProps({
  movieId: { type: String, required: true },
  postId: { type: String },
})
const session = useSessionStore()
const router = useRouter()
const route = useRoute()
const post_title = ref('')
const post_id = route.query.postId ? route.query.postId : null
const title = ref('')
const star_rate = ref(0)
const user_id = ref('')
const postusername = ref(null)
const content = ref('')
const movie_id = route.params.movieId
let guard = true

const goBack = () => {
  if (post_id)
    router.push(`/board/post/${movie_id}/${post_id}`)
  else
    router.push(`/board/list/${movie_id}`)
}
const submitForm = () => {
  const formData = new FormData()
  formData.append('movie_id', movie_id)
  formData.append('post_title', post_title.value)
  formData.append('content', content.value)
  formData.append('star_rate', star_rate.value)
  if (post_id) {
    formData.append('post_id', post_id)
    axios.put(`/api/movie/${movie_id}/post/${post_id}`, formData)
      .then(() => {
        ElMessage({ type: 'success', message: '게시물이 수정되었습니다' })
        guard = false
        router.replace(`/board/list/${movie_id}`)
      })
      .catch(() => {
        ElMessage({ type: 'error', message: '게시물 수정에 실패하였습니다 다시 시도해 보세요' })
      })
  }
  else {
    formData.append('user_id', user_id.value)
    axios.post(`/api/movie/${movie_id}/post`, formData)
      .then(() => {
        ElMessage({ type: 'success', message: '게시물이 등록되었습니다' })
        guard = false
        router.replace(`/board/list/${movie_id}`)
      })
      .catch(() => {
        ElMessage({ type: 'error', message: '게시물 등록에 실패하였습니다 다시 시도해 보세요' })
      })
  }
}
const submitFormOpen = () => {
  ElMessageBox.confirm(
    '게시물을 등록하시겠습니까?',
    'Confirm',
    {
      confirmButtonText: '네',
      cancelButtonText: '아니오',
      type: 'info',
    })
    .then(() => {
      submitForm()
    })
}
const getPost = async () => {
  if (post_id) {
    try {
      const res = await axios.get(
      `/api/movie/${movie_id}/post/${post_id}`,
      )
      title.value = res.data.movie_title
      content.value = res.data.content
      post_title.value = res.data.post_title
      star_rate.value = res.data.star_rate
      postusername.value = res.data.user_name
    }
    catch {
      ElMessage({ type: 'error', message: '게시물 정보가 없습니다' })
      guard = false
      router.back()
    }
  }
  else {
    try {
      const res = await axios.get(
        `/api/movie/${movie_id}`,
      )
      title.value = res.data.title
    }
    catch {
      ElMessage({ type: 'error', message: '영화에 대한 정보가 없습니다' })
    }
  }
}
onMounted(async () => {
  try {
    if (user_id.value === ('userid1' || ''))
      await session.checkLogin()
    user_id.value = session.user_id
    if (!user_id.value || user_id.value === ('userid1' || ''))
      throw new Error ('expired session')
    await getPost()
    if (postusername.value && postusername.value !== session.user_name) {
      guard = false
      ElMessage({ type: 'error', message: '권한이 없습니다' })
      router.push(`/board/list/${movie_id}`)
    }
  }
  catch {
    guard = false
    ElMessage({ type: 'error', message: '권한이 없습니다' })
    router.push(`/board/list/${movie_id}`)
  }
},
)
onBeforeRouteLeave((to, from, next) => {
  if (guard && (content.value !== '' || post_title.value !== '')) {
    ElMessageBox.confirm(
      '지금 이동하시면 작성/수정중인 정보를 잃게 됩니다. 이동하시겠습니까?',
      'Warning',
      {
        confirmButtonText: '네',
        cancelButtonText: '아니오',
        type: 'warning',
      })
      .then(() => {
        ElMessage({ type: 'info', message: '페이지를 이동합니다' })
        next()
      })
      .catch(() => next(false))
  }
  else { next() }
})
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
  <input
    v-model="post_title" type="text" placeholder="제목을 입력하세요"
    class="w-full px-2 py-2 my-5 text-16px font-bold outline"
  ><br>
  <TextEditor v-if="title !== ''" v-model="content" @update:model-value="() => {}" />
  <p class="w-full text-left mx-auto text-rtred">
    별점 :
    <el-rate v-model="star_rate" class="mx-1" show-score :colors="['#B5141C', '#B5141C', '#B5141C']" allow-half />
  </p>
  <div class="w-full text-right mx-auto">
    <el-button color="#c0c0c0" class="bg-rtgray" @click="goBack">
      뒤로가기
    </el-button>
    <el-button color="#151AA3" class="bg-rtblue text-white" @click="submitFormOpen">
      등록하기
    </el-button>
  </div>
</template>

<style lang="scss"></style>

<route lang="yaml">
meta:
  layout: onlyheader
  </route>
