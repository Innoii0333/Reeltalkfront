<script setup>
import axios from 'axios'
const props = defineProps({
  userId: { type: String, required: true },
})
const route = useRoute()
const nameResult = ref('한글 영문 숫자를 조합해 10자 이내로 입력해주세요')
const user_name = ref('')
const signUpFormCheck = ref(false)
const user_id = route.params.userId

const goBack = () => {
  window.close()
}

const userNameCheck = async () => {
  if (user_name.value === '' || user_name.value.length > 10) {
    nameResult.value = '한글 영문 숫자를 조합해 10자 이내로 입력해주세요'
    return
  }
  try {
    const nameResponse = await axios.get(`/api/signup/${user_name.value}`)
    if (nameResponse.data === true)
      nameResult.value = '중복된 닉네임입니다'
    else
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
    ElMessage({ type: 'success', message: '회원 가입에 성공했습니다' })
    window.close()
  }
  catch (e) {
    console.error('서버 요청 실패:', e)
    ElMessage({ type: 'error', message: '회원 가입이 되지 않았습니다. 다시 시도해 보세요' })
  }
}
</script>

<template>
  <div class="w-auto h-auto pt-20 text-center max-w-5xl items-center justify-center">
    <p class="my-5">
      Google 계정이 자동으로 등록됩니다.
    </p>
    <br>
    닉네임을 입력해주세요 :
    <input v-model="user_name" type="text" class="50px border border-black ml-2" @blur="userNameCheck"><br>
    <span>{{ nameResult }}</span>
    <p class="w-128 text-right mx-auto">
      <el-button :disabled="!signUpFormCheck" color="#151AA3" class="text-white bg-rtblue" @click="submitSignup">
        가입
      </el-button>
      <el-button color="#c0c0c0" class="bg-rtgray" @click="goBack">
        취소
      </el-button>
    </p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bare
    </route>

