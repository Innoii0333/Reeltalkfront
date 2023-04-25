<script setup>
import axios from 'axios'
const props = defineProps({
  key1: { type: String, required: true },
  key2: { type: String, required: true },
})
const route = useRoute()
const session = useSessionStore()
const key1 = route.params.key1
const key2 = route.params.key2

const sendDataToParent = async (data) => {
  // 부모 창의 함수 호출
  window.opener.postMessage(data, '*')
}

onMounted(async () => {
  const token = [key1, key2]
  session.initToken(token)
  await sendDataToParent(token)
  window.addEventListener('message', async (event) => {
    if (event.data.message) {
      switch (event.data.message) {
        case 'invalid-session':
          ElMessage({ type: 'error', message: 'session checking failed' })
          window.close()
          break
        case 'authenticated':
          ElMessage({ type: 'confirm', message: '로그인 되었습니다' })
          window.close()
          break
        default: break
      }
    }
  })
})
</script>

<template>
  <div>
    <div>
      "checking the session..."
    </div>
  </div>
</template>

<style></style>

<route lang="yaml">
meta:
  layout: bare
    </route>

