<script setup>
const result = ref('한글 영문 숫자를 조합해 10자 이내로 입력해주세요')
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
      <p class="w-128 text-right mx-auto">
        <el-button color="#151AA3" class="text-white">
          가입
        </el-button>
        <el-button color="#c0c0c0" @click="goBack">
          취소
        </el-button>
      </p>
    </div>
  </div>
</template>

<style lang="scss"></style>
