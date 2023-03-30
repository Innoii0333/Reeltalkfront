<script setup>
const result = ref('10자 이내의 한글 영문 숫자만 사용가능합니다')
</script>

<template>
  <div>
    <div>
      <h1>구글 계정으로 로그인</h1>
      <button class="border border-black px-2 py-0">
        G
      </button>
    </div>
    <div>
      <br>
      닉네임을 입력해주세요 :
      <input v-model="nickAdd" type="text" class="50px border border-black ml-2"><br>
      <span>{{ result }}</span>
      <p>
        <button class="border border-black px-2 py-0">
          가입
        </button>
        <button class="border border-black px-2 py-0">
          취소
        </button>
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
