<script setup>
</script>

<template>
  <div>Toast UI editor</div>
  <el-rate v-model="value" allow-half />
  <div class="w-full text-right mx-auto">
    <el-button color="#c0c0c0" @click="goBack">
      뒤로가기
    </el-button>
    <el-button color="#151AA3" class="text-white">
      등록하기
    </el-button>
  </div>
</template>

<style lang="scss"></style>
