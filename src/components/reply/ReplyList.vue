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
  if (showReReplyEdit.value === -1)
    reReply.value = ''
}
const getReplyList = async () => {
  try {
    const res = await axios.get(`/api/movie/${movieId}/post/${postId}/reply`)
    res.data.forEach((replies) => {
      replyList.value.push(replies)
    })
  }
  catch (e) {
    console.error(e)
    alert('댓글 정보를 불러오지 못했습니다')
  }
}
const modifyReply = async (idx) => {
  try {
    const res = await axios.put(
      `/api/movie/${movieId}/post/${postId}/reply/${replyList.value[idx].reply_id}`,
      changedReply)
    await getReplyList()
  }
  catch (e) {
    console.error(e)
    alert('댓글 수정에 실패했습니다')
  }
}
const deleteReply = async (idx) => {
  try {
    const res = await axios.delete(
      `/api/movie/${movieId}/post/${postId}/reply/${replyList.value[idx].reply_id}`)
    await getReplyList()
  }
  catch (e) {
    console.error(e)
    alert('댓글을 삭제하지 못했습니다. 대댓글이 달린 경우 삭제할 수 없습니다.')
  }
}
const reReplySubmit = (replyId) => {
  emits('reReplySubmit', replyId)
}
const handleInput = () => {
  emits('update:modelValue', reReply)
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
    <ul>
      <li v-if="replyList.value === []">
        등록된 댓글이 없습니다
      </li>
      <li v-for="(item, index) in replyList.value" v-else :key="index">
        <span>
          {{ item.user_name }}
        </span>
        <span>
          {{ item.reply_content }}
        </span>
        <span>
          {{ item.create_at }}
        </span>
        <img v-if="item.depth === 2" class="ml-2" inline-block src="/src/components/img/rep1.png">{{ item }}
        <button @click="toggleReReplyEdit(index)">
          <img src="/src/components/img/rep2.png" inline-block>
        </button>
        <button @click="toggleModifyReply(index)">
          <img src="/src/components/img/rep3.png" inline-block>
        </button>
        <button @click="deleteReply(index)">
          <img src="/src/components/img/rep4.png" inline-block>
        </button>
        <ReplyReplyEdit v-if="showModifyReply.value === index" v-model="changedReply" @reply-submit="modifyReply(index)">
          <span class="leading-4.5">
            수정
          </span>
        </ReplyReplyEdit>
        <ReplyReplyEdit
          v-if="showReReplyEdit.value === index" v-model="reReply" @update="handleInput"
          @reply-submit="reReplySubmit(item.reply_id)"
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
  width: 1;
  height: auto;
}
</style>
