<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const clientId = '139538114238-mrkvjksr5nmtmv4rahe81kf9cbtb2j33.apps.googleusercontent.com'
const loginUri = 'api/googleSignUp'
const nameResult = ref('한글 영문 숫자를 조합해 10자 이내로 입력해주세요')
const user_name = ref('')
const isLogin = ref(false)
const login = ref(null)
const signUpFormCheck = ref(false)
const user_id = ref('')
const goBack = () => {
  router.back()
}
const googleLogin = () => {
  // const googleLogin = async () => {
  //   const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
  //   const scope = 'https://www.googleapis.com/auth/userinfo.email'
  //   const state = 'Ac2or3n4A5c6ademy_Re7elta8lk9s0'
  //   const prompt = 'select_account'
  //   try {
  //     const response = await fetch(`${oauth2Endpoint}?scope=${scope}&response_type=token&prompt=${prompt}&redirect_uri=${redirectUri}&client_id=${clientId}`, {
  //       method: 'GET',
  //     })
  //   }
  //   catch (e) {
  //     console.error(e)
  //     alert('로그인에 오류가 발생했습니다. 다시 로그인해 주세요')
  //   }
  // }

  isLogin.value = true
//       })
//     .catch(
//       (e1) => {
//         console.error(e1)
//         alert('서버와의 통신에 오류가 발생했습니다. 다시 로그인해 주세요')
//         goBack()
//       })
}
onMounted(() => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
const userNameCheck = async (user_name) => {
  const nameResponse = await fetch (`api/signup/${user_name.value}`)
  if (idResponse.data === ref('true'))
    nameResult.value = '중복된 닉네임입니다'
  else if (user_name !== ref(''))
    nameResult.value = '사용할 수 있는 닉네임입니다'
}
watch(nameResult.value, (value) => {
  signUpFormCheck.value = value === '사용할 수 있는 닉네임입니다'
})

const submitSignup = () => {
  const formData = new FormData()
  formData.append('user_id', user_id.value)
  formData.append('user_name', user_name.value)
  axios.post('/api/signUp', formData)
    .then(() => {
      // 성공적으로 서버로 전송된 경우의 처리
      router.push('/main')
    })
    .catch((e) => {
      // 서버 전송 실패의 처리
      console.error('서버 요청 실패:', e)
      alert('회원 가입에 실패했습니다. 다시 시도해 보세요')
    })
}
</script>

<template>
  <div>
    <p>Google 계정이 자동으로 등록됩니다.</p>
    <div v-if="!isLogin">
      <div class="google-login">
        <div id="g_id_onload" :data-client_id="clientId" :data-login_uri="loginUri" data-auto_prompt="false" />
        <div
          class="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="signup_with"
          data-shape="circle" data-logo_alignment="left" @click="googleLogin"
        />
      </div>
    </div>
    <div v-else>
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
  </div>
</template>

<style scoped>
.google-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
