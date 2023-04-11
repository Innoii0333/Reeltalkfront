<script setup>
import axios from 'axios'
const route = useRoute()
const router = useRouter()
const title = ref('')
const movie_id = route.params.movieId
const post_id = route.params.postId
const content = ref('')
const create_at = ref('')
const star_rate = ref(null)
const view_count = ref(0)
const comment_count = ref(0)
const modifyPost = () => {
  // vue router를 활용해서 수정 페이지로 이동
  router.push({
    path: `/board/postedit/${movie_id}`, // `localhost:3000/post`
    query: { postId: post_id },
  })
}
const deletePost = () => {
  axios.delete(`/api/movie/${movie_id}/post/${post_id}`)
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
</script>

<template>
  <div>
    <div class="text-5 ml-3 px-auto text-left">
      moviename

      {{ movie_id }}
    </div>
    <hr class="border-rtblue my-2 border-2">
    <div>
      <table class="px-auto border-collapse">
        <tr class="text-16px h-12 py-auto">
          <th class="w-30">
            {{ post_id }}
          </th>
          <th class="text-left w-auto" colspan="4">
            제목
          </th>
        </tr>
        <tr class="text-10px align-top h-5">
          <td class="w-30">
            닉네임은최대10자로
          </td>
          <td class="text-left w-200">
            2023-03-31 15:30
          </td>
          <td class="w-50">
            <el-rate
              v-if="star_rate" v-model="star_rate" disabled show-score
              :colors="['#B5141C', '#B5141C', '#B5141C']"
              score-template="평점 {star_rate} 점"
            />
            <span v-else>평점 미등록</span>
          </td>
          <td class="w-15">
            조회 : 3
          </td>
          <td class="w-15">
            댓글 : 2
          </td>
        </tr>
      </table>
      <hr class="border-rtblue my-2">
      <div class="text-left">
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
        <p> 내용</p>
      </div>
      <div class="text-right">
        <el-button color="#c0c0c0" @click="modifyPost">
          수정
        </el-button>
        <el-button color="#B5141C" class="text-white" @click="deletePost">
          삭제
        </el-button>
      </div>
    </div>
    <div>
      컴포넌트-댓글
    </div>
  </div>
</template>

<style lang="scss"></style>
