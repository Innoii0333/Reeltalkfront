<script setup>
import axios from 'axios'
const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const key1 = route.params.key1
const key2 = route.params.key2
const isLoading = ref(false)

const sendDataToParent = async (data) => {
  // 부모 창의 함수 호출
  window.opener.postMessage(data, '*')
}
const finishSession = () => {
  isLoading.value = false
  window.close()
}
onMounted(async () => {
  isLoading.value = true
  const token = [key1, key2]
  session.initToken(token)
  await sendDataToParent(token)
  window.addEventListener('message', async (event) => {
    if (event.data.message) {
      switch (event.data.message) {
        case 'invalid-session':
          alert('session checking failed')
          finishSession()
          break
        case 'authenticated':
          finishSession()
          break
        default: break
      }
    }
  })
})
</script>

<template>
  <div>
    <el-loading :visible="isLoading">
      <div>
        "checking the session..."
      </div>
    </el-loading>
  </div>
</template>

<style></style>

<route lang="yaml">
meta:
  layout: bare
    </route>

