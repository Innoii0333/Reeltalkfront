<script setup>
import axios from 'axios'

const router = useRouter()
const session = ref(null)
const requestSession = async () => {
  try {
    const res = await axios.get('/api/session')
    const userToken = res.data.token_id
    useSessionStore().setToken(userToken)
    router.push('/main')
  }
  catch (e) {
    console.error(e)
    router.push('/login')
  }
}
onMounted(async () => {
  await requestSession()
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
