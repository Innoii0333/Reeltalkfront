<script setup>
import { ElLoading } from 'element-plus'
const session = useSessionStore()

const sendDataToParent = async (data) => {
  // 부모 창의 함수 호출
  console.log(window.opener, data)
  window.opener.postMessage(data, '*')
}

const finishSession = () => {
  console.log('done')
  window.close()
}
onMounted(async () => {
  const loadingInstance1 = ElLoading.service({ fullscreen: true })
  const token = ['121313131', '1231313131']
  session.initToken(token)
  console.log(token)
  window.opener.postMessage({ message: 'session_ready' }, '*')
  window.addEventListener('message', async (event) => {
    console.log('event', token)
    try {
      switch (event.data.message) {
        case 'give-me-data':
          await sendDataToParent(token)
          break
        case 'received':
          loadingInstance1.close()
          finishSession()
          break
        default: throw new Error('session checking failed')
      }
    }
    catch (e) {
      alert('session checking failed')
    }
  })
})
</script>

<template>
  <p>
    checking the session....
  </p>
</template>
