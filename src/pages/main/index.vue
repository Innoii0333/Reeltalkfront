<script setup>
import Header from '../../components/Header.vue'

export default {
  components: {
    Header,
  },
}
</script>

<template>
  <div>
    <Header />
    <h1>Main Body</h1>
    <img class="w-full" alt="Movie Poster" src="../../components/img/movie1.jpg">
    이미지 swipe / 이미지 하단에 투명으로 영화 간단정보 출력
    <h2>Hot Movie 게시물 // Hot Post 게시물</h2>
  </div>
</template>

<style lang="scss"></style>
