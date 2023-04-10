<script setup>
import axios from 'axios'

const router = useRouter()

const session = ref(null)
onMounted(async () => {
  try {
    const res = await axios.get('/api/session')
    // 성공적으로 서버로 전송된 경우의 처리
    const userToken = res.json().token_id
    useSessionStore().setToken(userToken)
    router.push('/main')
  }
  catch (e) {
    // 서버 전송 실패의 처리
    console.error('서버 요청 실패:', e)
    alert('로그인에 실패했습니다. 다시 시도해 주세요')
    router.push('/login')
  }
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
