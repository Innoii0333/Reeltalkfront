<script setup>
const router = useRouter()
const clientId = '642329806194-vh1ikkvkaq7n94ajp0dejdqb1o6n73e9.apps.googleusercontent.com'
const loginUri = '/api/googleSignUp'

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
</script>

<template>
  <div class="w-auto h-auto pt-20 text-center max-w-5xl items-center justify-center">
    <p class="my-5">
      Google 계정이 자동으로 등록됩니다.
    </p>
    <div class="google-login">
      <div id="g_id_onload" :data-client_id="clientId" :data-login_uri="loginUri" data-auto_prompt="true" />
      <div
        class="g_id_signin" data-type="standard" data-size="large" data-theme="outline" data-text="signup_with"
        data-shape="circle" data-logo_alignment="left"
      />
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

<route lang="yaml">
meta:
  layout: bare
    </route>

