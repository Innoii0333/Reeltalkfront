<script setup>
const chatText = ref('')
const userName = ref('')
const enterUser = ref(false)
const msgList = ref([])
let socket

const sendMsg = () => {
  if (!chatText.value)
    return
  socket.send(`${userName.value} : ${chatText.value}`)
  chatText.value = ''
}
const setUser = () => {
  if (!userName.value)
    return
  enterUser.value = true
  socket = new WebSocket('ws://localhost:3333/chat')
  socket.addEventListener('message', (event) => {
    msgList.value.push(event.data)
  })
}

onBeforeUnmount(() => {
  if (socket)
    socket.close()
})
</script>

<template>
  <div class="w-256 mx-auto">
    <div class="text-2xl font-bold">
      Chat
    </div>
    <div v-if="!enterUser" class="w-full flex items-center gap-4">
      <p class="w-34">
        User 이름
      </p>
      <el-input v-model="userName" placeholder="챗에 사용할 유저 이름을 입력해 주세요" @keyup.enter="setUser" />
      <el-button @click="setUser">
        보내기
      </el-button>
    </div>
    <div v-else class="w-full flex items-center gap-4">
      <el-input v-model="chatText" placeholder="Please input" @keyup.enter="sendMsg" />
      <el-button @click="sendMsg">
        보내기
      </el-button>
    </div>
    <div class="text-left">
      <p v-for="(text, idx) in msgList" :key="`msg-${idx}`">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
