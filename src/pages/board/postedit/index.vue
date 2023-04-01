<script setup>
</script>

<template>
  <div>Toast UI editor</div>
  <p class="w-full text-left mx-auto text-rtred">
    별점 :
    <el-rate v-model="value" class="mx-1" show-score :colors="['#B5141C', '#B5141C', '#B5141C']" allow-half />
  </p>
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
