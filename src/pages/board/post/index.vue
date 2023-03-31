<script setup>
</script>

<template>
  <div>
    테이블
    게시글id 게시글제목
    닉네임 작성일시 조회 댓글
    <el-rate
      v-model="value"
      disabled
      show-score
      score-template="평점 {value} 점"
    />
    내용
    <button>수정</button>
    <button>삭제</button>
  </div>
  <div>
    컴포넌트-댓글
  </div>
</template>

<style lang="scss"></style>
