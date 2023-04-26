<script setup>
const messages = ref([])
const inputMessage = ref('')
let socket
const messageList = ref(null)
const nickname = ref('')

onMounted(() => {
  const userNickname = prompt('닉네임을 입력해주세요:')
  if (userNickname && userNickname.trim() !== '')
    nickname.value = userNickname.trim()
  else
    nickname.value = '익명'
})

const sendMessage = () => {
  if (inputMessage.value.trim() === '')
    return

  const message = {
    nickname: nickname.value,
    text: inputMessage.value.trim(),
    id: Date.now(),
    isMine: true,
  }

  socket.send(JSON.stringify(message))
  messages.value.push(message)
  inputMessage.value = ''
  // 메시지를 전송한 후 스크롤을 맨 아래로 이동
}

onMounted(() => {
  socket = new WebSocket('ws://localhost:8079')

  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)
      if (message.nickname !== nickname.value) {
        message.isMine = false
        messages.value.push(message)
        nextTick(() => { // 스크롤을 맨 아래로 내리기 위해 nextTick을 사용하세요.
          messageList.value.scrollTop = messageList.value.scrollHeight
        })
      }
    }
    catch (error) {
      console.error('Received non-JSON message:', event.data)
    }
  }
})

onUnmounted(() => {
  socket.close()
})
</script>

<template>
  <div class="talk-window">
    <el-container>
      <el-main ref="messageList" class="messages">
        <div v-for="message in messages" :key="message.id" :class="{ 'my-message': message.isMine, 'other-message': !message.isMine }">
          <div v-if="!message.isMine" class="message-nickname">
            {{ message.nickname }}
          </div>
          <div class="message-text">
            {{ message.text }}
          </div>
        </div>
      </el-main>
      <el-footer class="input-area">
        <el-input v-model="inputMessage" type="text" placeholder="메시지를 입력하세요" class="input-message" @keyup.enter="sendMessage" />
        <el-button type="primary" class="send-button" @click="sendMessage">
          전송
        </el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.talk-window {
  height: 100%;
}

.messages {
  height: 600px;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  scroll-behavior: smooth;
}

.input-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.my-message,
.other-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.my-message {
  justify-content: flex-end;
}

.other-message {
  justify-content: flex-start;
}

.message-nickname {
  margin-right: 0.5rem;
  font-weight: bold;
}

.message-text {
  background-color: #f1f1f1;
  padding: 0.5rem;
  border-radius: 0.5rem;
}
.input-message {
  flex-grow: 1;
  margin-right: 1rem;
}

.send-button {
  flex-shrink: 0;
}
</style>
