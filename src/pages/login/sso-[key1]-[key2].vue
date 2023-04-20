<script setup>
import axios from 'axios'
const route = useRoute()
const router = useRouter()
const session = useSessionStore()
const key1 = route.params.key1
const key2 = route.params.key2
// const requestSession = async () => {
//   try {
//     const res = await axios.get(`/api/session/${key1}/${key2}`)
//     const userToken = res.data.token_id
//     useSessionStore().setToken(userToken)
//     router.push('/main')
//   }
//   catch (e) {
//     console.error(e)
//     router.push('/login')
//   }
// }
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
  const token = [key1, key2]
  session.initToken(token)
  window.addEventListener('message', async (event) => {
    console.log('event', token)
    try {
      switch (event.data.message) {
        case 'invalid-session':
          alert('session checking failed')
          finishSession()
          break
        case 'authenticated':
          loadingInstance1.close()
          finishSession()
          break
        default: break
      }
    }
    catch (e) {
      alert('session checking failed')
      window.close()
    }
  })
})
</script>

<template>
  <div>
    <p>
      "checking the session..."
    </p>
  </div>
</template>

<style></style>

<route lang="yaml">
meta:
  layout: bare
    </route>

