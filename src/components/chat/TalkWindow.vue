<script setup>
const messages = ref([])
const inputMessage = ref('')

let ws

onMounted(() => {
  ws = new WebSocket('ws://localhost:8888')

  ws.addEventListener('message', (event) => {
    messages.value.push(event.data)
  })
})

onUnmounted(() => {
  if (ws)
    ws.close()
})

const sendMessage = () => {
  if (!inputMessage.value.trim())
    return

  ws.send(inputMessage.value)
  inputMessage.value = ''
}
</script>

<template>
  <div class="talk-window">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
      </div>
    </div>
    <div class="input-area">
      <input v-model="inputMessage" type="text" placeholder="메시지를 입력하세요" @keyup.enter="sendMessage">
      <button @click="sendMessage">
        전송
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.talk-window {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;

    .message {
      margin-bottom: 1rem;
    }
  }

  .input-area {
    display: flex;
    align-items: center;
    padding: 1rem;

    input {
      flex: 1;
      margin-right: 1rem;
    }
  }
}
</style>
