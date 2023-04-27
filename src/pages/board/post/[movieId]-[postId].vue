<script setup>
import axios from 'axios'
import { onBeforeRouteLeave } from 'vue-router'

const props = defineProps({
  movieId: { type: String, required: true },
  postId: { type: String },
})
const session = useSessionStore()
const route = useRoute()
const router = useRouter()
const title = ref('')
const post_title = ref('')
const postusername = ref('')
const movie_id = route.params.movieId
const post_id = route.params.postId
const content = ref('')
const create_at = ref('')
const star_rate = ref(null)
const view_count = ref(0)
const comment_count = ref(0)
const replyContents = ref('')
const reReplyContents = ref('')
const userId = ref('')
const now = new Date()
const formedDate = ref(null)
const postuserId = ref('')
let guard = true

const getPost = async () => {
  try {
    const res = await axios.get(
      `/api/movie/${movie_id}/post/${post_id}`,
    )
    title.value = res.data.movie_title
    content.value = res.data.content
    post_title.value = res.data.post_title
    const date = new Date(res.data.create_at)
    formedDate.value = now.toDateString() !== date.toDateString()
      ? `${date.getFullYear().toString().slice(-2)}/${date.getMonth() + 1}/${date.getDate()}`
      : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    create_at.value = formedDate.value
    star_rate.value = res.data.star_rate
    view_count.value = res.data.view_count
    comment_count.value = res.data.comment_count
    postusername.value = res.data.user_name
    postuserId.value = res.data.user_id
  }
  catch {
    guard = false
    ElMessage({ type: 'error', message: '게시물 정보가 없습니다' })
    router.replace(`/board/list/${movie_id}`)
  }
}
const modifyPost = () => {
  router.push({
    path: `/board/postedit/${movie_id}`,
    query: { postId: post_id },
  })
}
const deletePost = async () => {
  if (comment_count.value !== 0) {
    ElMessage({ type: 'error', message: '댓글이 달린 게시물은 삭제할 수 없습니다' })
  }
  else if (userId.value !== postuserId.value) {
    ElMessage({ type: 'error', message: '삭제할 권한이 없습니다' })
  }
  else {
    await axios.delete(`/api/movie/${movie_id}/post/${post_id}`)
      .then(() => {
        ElMessage({ type: 'success', message: '게시물이 삭제되었습니다' })
        guard = false
        router.replace(`/board/list/${movie_id}`)
      })
      .catch(() => {
        ElMessage({ type: 'error', message: '게시물 삭제에 실패하였습니다 다시 시도해 보세요' })
      })
  }
}
const submitReply = async (pReplyId) => {
  if (userId.value === '') {
    ElMessage({ type: 'error', message: '로그인 상태가 아닙니다' })
    return
  }
  const formData = new FormData()
  formData.append('user_id', userId.value)
  if (pReplyId) {
    formData.append('reply_content', reReplyContents.value)
    formData.append('parent_reply_id', pReplyId)
  }
  else {
    formData.append('reply_content', replyContents.value)
  }
  try {
    const res = await axios.post(`/api/movie/${movie_id}/post/${post_id}/reply`, formData)
    ElMessage({ type: 'success', message: '댓글이 등록되었습니다' })
    router.go(0)
  }
  catch {
    ElMessage({ type: 'error', message: '댓글 등록에 실패했습니다' })
  }
}
onMounted(async () => {
  if (!session.user_id)
    await session.checkLogin()
  userId.value = session.user_id

  await getPost()
})
onBeforeRouteLeave((to, from, next) => {
  if (guard && (reReplyContents.value !== '' || replyContents.value !== '')) {
    ElMessageBox.confirm(
      '지금 이동하시면 정보를 잃게 됩니다. 이동하시겠습니까?',
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
  <only-header />
  <div class="max-w-7xl min-w-2xl mx-5">
    <div class="text-5 ml-3 my-5 px-auto text-left">
      {{ title }}
    </div>
    <hr class="border-rtblue my-2 border-2">
    <div>
      <table class="px-auto border-collapse">
        <tr class="text-16px h-12 py-auto">
          <th class="w-30">
            {{ post_id }}
          </th>
          <th class="text-left w-auto" colspan="4">
            {{ post_title }}
          </th>
        </tr>
        <tr class="text-12px text-center px-auto h-5">
          <td class="w-30">
            {{ postusername }}
          </td>
          <td class="text-left w-200">
            {{ create_at }}
          </td>
          <td class="w-50">
            <el-rate
              v-if="star_rate" v-model="star_rate" disabled show-score
              :colors="['#B5141C', '#B5141C', '#B5141C']"
            />
            <span v-else>평점 미등록</span>
          </td>
          <td class="w-15">
            조회 : {{ view_count }}
          </td>
          <td class="w-15">
            댓글 : {{ comment_count }}
          </td>
        </tr>
      </table>
      <hr class="border-rtblue my-2">
      <div class="text-left min-h-sm" v-html="content" />
      <div class="text-right">
        <el-button color="#C0C0C0" class="bg-rtgray" @click="modifyPost">
          수정
        </el-button>
        <el-button color="#B5141C" class="bg-rtred text-white" @click="deletePost">
          삭제
        </el-button>
      </div>
    </div>
    <div class="text-sm">
      <reply-reply-edit v-model="replyContents" @reply-submit="submitReply" />
      <reply-reply-list
        v-model="reReplyContents" :movie-id="movie_id" :post-id="post_id" :user-id="userId"
        @re-reply-submit="submitReply"
      />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bare
    </route>

