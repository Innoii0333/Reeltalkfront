<script setup>
import axios from 'axios'

const router = useRouter()

const session = ref(null)
onMounted(() => {
  axios.get('/api/session')
    .then((res) => {
      const userToken = res.json().token_id
      useSessionStore().setToken(userToken)
      router.push('/main')
    })
    .catch((e) => {
      console.error(e)
      router.push('/login')
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
