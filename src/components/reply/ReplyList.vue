<script setup>
import axios from 'axios'
const props = defineProps({
  modelValue: {
    type: String,
  },
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
    replyList.value = res.data.map((item) => {
      const date = new Date(item.create_at)
      const now = new Date()
      const formedDate = now.toDateString() !== date.toDateString()
        ? `${date.getFullYear().toString().slice(-2)}/${date.getMonth() + 1}/${date.getDate()}`
        : `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      return { ...item, create_at: formedDate }
    })
  }
  catch {
    ElMessage({ type: 'error', message: '댓글 정보를 불러오지 못했습니다' })
  }
}
const modifyReply = async (idx) => {
  try {
    const confirmBox = await ElMessageBox.confirm(
      '댓글을 수정하시겠습니까?',
      'Warning',
      { confirmButtonText: '네', cancelButtonText: '아니오', type: 'warning' })
    try {
      const formData = new FormData()
      formData.append('user_id', props.userId)
      formData.append('reply_content', changedReply.value)
      const res = await axios.put(
      `/api/movie/${props.movieId}/post/${props.postId}/reply/${replyList.value[idx].reply_id}`,
      formData)
      toggleModifyReply(idx)
      ElMessage({ type: 'success', message: '댓글이 수정되었습니다' })
    }
    catch {
      ElMessage({ type: 'error', message: '댓글 수정에 실패했습니다' })
    }
    await getReplyList()
  }
  catch {
    ElMessage({ type: 'info', message: '댓글을 수정하지 않았습니다' })
  }
}
const deleteReply = async (index) => {
  try {
    const confirmBox = await ElMessageBox.confirm(
      '댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다',
      'Warning',
      { confirmButtonText: '네', cancelButtonText: '아니오', type: 'warning' })
    try {
      const res = await axios.delete(
        `/api/movie/${props.movieId}/post/${props.postId}/reply/${replyList.value[index].reply_id}`)
      if (res.data === false)
        throw new Error(e)
      ElMessage({ type: 'success', message: '댓글이 삭제되었습니다' })
    }
    catch {
      ElMessage({ type: 'error', message: '댓글이 삭제되지 않았습니다 대댓글이 달린 경우 삭제할 수 없습니다' })
    }
    await getReplyList()
  }
  catch {
    ElMessage({ type: 'info', message: '댓글 삭제를 취소했습니다' })
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
watch(() => reReply.value, (newValue) => {
  if (newValue !== '')
    handleInput()
})
</script>

<template>
  <div>
    <ul class="max-w-2xl my-5 mx-auto text-16px">
      <li v-if="replyList.length === 0" class="ml-3 px-2 inline-block">
        등록된 댓글이 없습니다
      </li>
      <li v-for="(item, index) in replyList" v-else :key="index" class="ml-3 px-2 my-1 inline-block">
        <div v-if="showModifyReply !== index" class="flex">
          <img
            v-if="item?.depth === 2" class="ml-1 pl-1 w-5.4 justify-center mt-1.8 inline-block"
            src="/src/components/img/rep1.png"
          >
          <span class="basis-15 px-2 text-left">
            {{ item?.user_name }}
          </span>
          <span class="flex-1 mx-5 max-w-2xl text-left">
            {{ item?.reply_contents }}
          </span>
          <span class="basis-15 mx-3 pr-2">
            {{ item?.create_at }}
          </span>
          <span class="basis-10 mx-1 px-2 whitespace-nowrap">
            <button v-if="item?.depth === 1" class="mx-1 inline-block" @click="toggleReReplyEdit(index)">
              <img src="/src/components/img/rep2.png" inline-block>
            </button>
            <button class="mx-1 inline-block" @click="toggleModifyReply(index)">
              <img src="/src/components/img/rep3.png" inline-block>
            </button>
            <button class="mx-1 inline-block" @click="deleteReply(index)">
              <img src="/src/components/img/rep4.png" inline-block>
            </button>
          </span>
        </div>
        <div v-else-if="showModifyReply === index" class="inline-block flex justify-center items-center">
          <textarea
            v-model="changedReply"
            class="border-0.5 border-black px-1 py-1 my-2 mr-0 ml-auto min-w-xl max-w-2xl text-3 leading-normal inline"
          />
          <el-button color="#151AA3" class="text-white bg-rtblue ml-2 mr-0" @click="modifyReply(index)">
            수정
          </el-button>
          <el-button color="#c0c0c0" class="bg-rtgray ml-2 mr-auto" @click="toggleModifyReply(index)">
            취소
          </el-button>
        </div>
        <div v-if="showReReplyEdit === index" class="inline-block ml--3 max-w-41rem mx-auto">
          <ReplyReplyEdit
            v-model="reReply"
            @reply-submit="reReplySubmit(item?.reply_id)"
          >
            <span class="leading-4.5">
              대댓글 <br>
              등록
            </span>
          </ReplyReplyEdit>
        </div>
      </li>
    </ul>
  </div>
</template>
