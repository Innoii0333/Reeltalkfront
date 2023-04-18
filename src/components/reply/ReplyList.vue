<script setup>
import axios from 'axios'
const props = defineProps({
  movieId: {
    type: String,
  },
  postId: {
    type: String,
  },
  userId: {
    type: String,
  },
})
const emits = defineEmits(['update:modelValue', 'reReplySubmit'])
const reReply = ref('')
const changedReply = ref('')
const showReReplyEdit = ref(-1)
const showModifyReply = ref(-1)
const replyList = ref([])
const toggleReReplyEdit = (index) => {
  showReReplyEdit.value = (showReReplyEdit.value === index) ? -1 : index
  showModifyReply.value = -1
  if (showReReplyEdit.value === -1)
    reReply.value = ''
}
const toggleModifyReply = (index) => {
  showModifyReply.value = (showModifyReply.value === index) ? -1 : index
  showReReplyEdit.value = -1
  if (showModifyReply.value === index)
    changedReply.value = replyList.value[index].reply_contents
  else changedReply.value = ''
}
const getReplyList = async () => {
  try {
    const res = await axios.get(`/api/movie/${props.movieId}/post/${props.postId}/reply`)
    replyList.value = res.data
  }
  catch (e) {
    console.error(e)
    alert('댓글 정보를 불러오지 못했습니다')
  }
}
const modifyReply = async (idx) => {
  const formData = new FormData()
  formData.append('user_id', props.userId)
  formData.append('content', changedReply)
  try {
    const res = await axios.put(
      `/api/movie/${props.movieId}/post/${props.postId}/reply/${replyList.value[idx].reply_id}`,
      formData)
    await getReplyList()
  }
  catch (e) {
    console.error(e)
    alert('댓글 수정에 실패했습니다')
  }
}
const deleteReply = async (index) => {
  try {
    const res = await axios.delete(
      `/api/movie/${props.movieId}/post/${props.postId}/reply/${replyList.value[index].reply_id}`)
    await getReplyList()
  }
  catch (e) {
    console.error(e)
    alert('댓글을 삭제하지 못했습니다. 대댓글이 달린 경우 삭제할 수 없습니다.')
  }
}
const reReplySubmit = (pReplyId) => {
  emits('reReplySubmit', pReplyId)
}
const handleInput = () => {
  emits('update:modelValue', reReply.value)
}
onMounted(async () => {
  await getReplyList()
})
watch(() => reReply, (newValue) => {
  if (newValue !== '')
    handleInput()
})
</script>

<template>
  <div>
    <ul class="min-w-5xl">
      <li v-if="replyList.value.length === 0">
        등록된 댓글이 없습니다
      </li>
      <li v-for="(item, index) in replyList" v-else :key="index" class="ml-3">
        <div v-if="showModifyReply !== index">
          <span class="w-30 px-2 text-left">
            {{ item?.user_id }}
          </span>
          <span class="w-auto text-left">
            <img v-if="item?.depth === 2" class="ml-2 pl-2" inline-block src="/src/components/img/rep1.png">
            {{ item?.reply_contents }}
          </span>
          <span class="w-15">
            {{ item?.create_at }}
          </span>
          <span class="w-15">
            <button v-if="item?.depth === 1" @click="toggleReReplyEdit(index)">
              <img src="/src/components/img/rep2.png" inline-block>
            </button>
            <button @click="toggleModifyReply(index)">
              <img src="/src/components/img/rep3.png" inline-block>
            </button>
            <button @click="deleteReply(index)">
              <img src="/src/components/img/rep4.png" inline-block>
            </button>
          </span>
        </div>
        <div v-else-if="showModifyReply === index" class="inline-block flex justify-center items-center">
          <textarea v-model="changedReply" class="border-0.5 border-black px-1 py-1 my-2 mr-0 ml-auto min-w-2xl text-3 leading-normal" />
          <el-button color="#151AA3" class="text-white bg-rtblue ml-2 mr-0" @click="modifyReply(index)">
            수정
          </el-button>
          <el-button color="#c0c0c0" class="bg-rtgray ml-2 mr-auto" @click="toggleModifyReply(index)">
            취소
          </el-button>
        </div>
        <ReplyReplyEdit
          v-if="showReReplyEdit === index" v-model="reReply" @update="handleInput"
          @reply-submit="reReplySubmit(item?.reply_id)"
        >
          <span class="leading-4.5">
            대댓글 <br>
            등록
          </span>
        </ReplyReplyEdit>
      </li>
    </ul>
  </div>
</template>

<style scoped>
img {
  width: 15px;
  height: auto;
}
</style>
