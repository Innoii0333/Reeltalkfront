<script setup>
import axios from 'axios'
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
const replyContents = ref(null)
const reReplyContents = ref(null)
const userId = ref('123')
const getPost = async () => {
  try {
    const res = await axios.get(
      `/api/movie/${movie_id}/post/${post_id}`,
      // `http://localhost:3000/post?postid=${post_id}`,
    )
    title.value = res.data.movie_title
    content.value = res.data.content
    post_title.value = res.data.post_title
    create_at.value = res.data.create_at
    star_rate.value = res.data.star_rate
    view_count.value = res.data.view_count
    comment_count.value = res.data.comment_count
    postusername.value = res.data.user_name
    // postusername.value = res.data.username
    // post_title.value = res.data.postTitle
    // create_at.value = res.data.createAt
    // star_rate.value = res.data.starrate
    // view_count.value = res.data.viewCount
    // comment_count.value = res.data.commentCount
  }
  catch (e) {
    console.error(e)
    alert('게시물 정보가 없습니다')
  }
}
const modifyPost = () => {
  // vue router를 활용해서 수정 페이지로 이동
  router.push({
    path: `/board/postedit/${movie_id}`,
    query: { postId: post_id },
  })
}
const deletePost = async () => {
  if (comment_count.value !== 0) {
    alert('댓글이 달린 게시물은 삭제할 수 없습니다')
    return
  }
  await axios.delete(`/api/movie/${movie_id}/post/${post_id}`)
    .then(() => {
      // 성공적으로 서버로 전송된 경우의 처리
      router.push(`/board/list/${movie_id}`)
    })
    .catch((e) => {
      // 서버 전송 실패의 처리
      console.error('서버 요청 실패:', e)
      alert('게시물 삭제에 실패하였습니다 다시 시도해 보세요')
    })
}
const submitReply = async (pReplyId) => {
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
    alert('댓글이 등록되었습니다')
    router.push(`/board/post/${movie_id}/${post_id}`)
  }
  catch (e) {
    console.error(e)
    alert('댓글 작성에 실패했습니다')
  }
}
onMounted(async () => {
  await getPost()
})
</script>

<template>
  <div>
    <div class="text-5 ml-3 px-auto text-left">
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
        <tr class="text-10px align-top h-5">
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
    <div>
      <reply-reply-edit v-model="replyContents" @reply-submit="submitReply" />
      <reply-reply-list
        v-model="reReplyContents" :movie-id="movie_id" :post-id="post_id" :user-id="userId"
        @re-reply-submit="submitReply"
      />
    </div>
  </div>
</template>

<style lang="scss"></style>
