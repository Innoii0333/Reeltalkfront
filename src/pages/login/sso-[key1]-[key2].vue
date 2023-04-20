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
  window.opener.receiveChild(data)
  // promise 반환
  return new Promise((resolve, reject) => {
    // 부모 창에서 데이터를 받으면 resolve 호출
    window.addEventListener('message', (event) => {
      if (event.data.message === 'received')
        resolve()
      else reject(err)
    })
  })
}
onMounted(async () => {
  const token = [key1, key2]
  session.initToken(token)
  await sendDataToParent(token)
  window.close()
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

