<script setup>
const props = defineProps({
  value: {
    type: string,
  },
})
const emits = defineEmits(['update:modelValue', 'reReplySubmit'])

const reReply = ref('')
const showReReplyEdit = ref(false)

const items = ['a', 'b', 'c']

const toggleReReplyEdit = (index) => {
  showReReplyEdit.value = (showReReplyEdit.value === index) ? false : index
  if (showReReplyEdit.value === false)
    reReply.value = ''
}
const reReplySubmit = () => {
  emits('reReplySubmit')
}
const handleInput = () => {
  emits('update:modelValue', reReply)
}
watch(() => reReply, (newValue) => {
  if (newValue !== '')
    handleInput()
})
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button @click="toggleReReplyEdit(index)">
          <img src="/src/components/img/rep2.png">
        </button>
        <ReplyReplyEdit v-if="showReReplyEdit[index]" v-model="reReply" @update="handleInput" @reply-submit="reReplySubmit">
          <span class="leading-4.5">
            대댓글  <br>
            등록
          </span>
        </ReplyReplyEdit>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
</style>
