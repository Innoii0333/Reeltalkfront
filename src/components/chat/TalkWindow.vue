<script setup>
const messages = ref([])
const inputMessage = ref('')
let socket
const messageList = ref(null)
const nickname = ref('')
// 타임스태프 추가
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const amPm = hours >= 12 ? '오후' : '오전'
  const formattedHours = hours % 12 || 12
  const formattedMinutes = minutes.toString().padStart(2, '0')
  return `${amPm} ${formattedHours}:${formattedMinutes}`
}

// 타임스태프 추가 여기부터
const open = () => {
  ElMessageBox.prompt('닉네임을 입력해주세요', 'Tip', {
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  })
    .then(({ value }) => {
      if (value && value.trim() !== '')
        nickname.value = value.trim()

      else
        nickname.value = '익명'

      ElMessage({
        type: 'success',
        message: `Your nickname is: ${nickname.value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
// // 타임스태프 추가 여기까지

const sendMessage = () => {
  if (inputMessage.value.trim() === '')
    return
  const message = {
    nickname: nickname.value,
    text: inputMessage.value.trim(),
    id: Date.now(),
    isMine: true,
    timestamp: new Date().toISOString(), // 타임 스탬프 추가
  }

  socket.send(JSON.stringify(message))
  messages.value.push(message)
  inputMessage.value = ''
}
// 여기부터
const scrollToBottom = () => {
  const myDiv = document.querySelector('.messages')

  function updateScroll() {
    const isScrolledToBottom = myDiv.scrollHeight - myDiv.scrollTop === myDiv.clientHeight
    if (!isScrolledToBottom)
      myDiv.scrollTop = myDiv.scrollHeight - myDiv.clientHeight
  }
  nextTick(() => {
    updateScroll()
  })
}

onMounted(() => {
  socket = new WebSocket('ws://localhost:8079')
  open()
  socket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)
      if (message.nickname !== nickname.value) {
        message.isMine = false
        messages.value.push(message)
      }
      scrollToBottom()
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
            <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
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

.timestamp {
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: #888;
}
</style>
