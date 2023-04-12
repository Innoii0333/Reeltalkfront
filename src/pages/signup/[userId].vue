<script setup>
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const nameResult = ref('한글 영문 숫자를 조합해 10자 이내로 입력해주세요')
const user_name = ref('')
const signUpFormCheck = ref(false)
const user_id = route.params.userId

const goBack = () => {
  router.back()
}

const userNameCheck = async () => {
  try {
    const nameResponse = await axios.get (`/api/signup/${user_name.value}`)
    if (nameResponse.data === true)
      nameResult.value = '중복된 닉네임입니다'
    else if (user_name.value !== '')
      nameResult.value = '사용할 수 있는 닉네임입니다'
  }
  catch (e) {
    console.error(e)
  }
}
watch(nameResult, async (value) => {
  signUpFormCheck.value = value === '사용할 수 있는 닉네임입니다'
})

const submitSignup = async () => {
  const formData = new FormData()
  formData.append('user_id', user_id)
  formData.append('user_name', user_name.value)

  try {
    await axios.post('/api/signup', formData)
    // 성공적으로 서버로 전송된 경우의 처리
    router.push('/main')
  }
  catch (e) {
    // 서버 전송 실패의 처리
    console.error('서버 요청 실패:', e)
    alert('회원 가입에 실패했습니다. 다시 시도해 보세요')
  }
}
</script>

<template>
  <div>
    <p>Google 계정이 자동으로 등록됩니다.</p>
    <br>
    닉네임을 입력해주세요 :
    <input v-model="user_name" type="text" class="50px border border-black ml-2" @blur="userNameCheck"><br>
    <span>{{ nameResult }}</span>
    <p class="w-128 text-right mx-auto">
      <el-button :disabled="!signUpFormCheck" color="#151AA3" class="text-white" @click="submitSignup">
        가입
      </el-button>
      <el-button color="#c0c0c0" @click="goBack">
        취소
      </el-button>
    </p>
  </div>
</template>
