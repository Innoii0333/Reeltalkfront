<script setup>
</script>

<template>
  <div class="ml-3 px-auto text-left">
    Category
  </div>
  <div class="text-right">
    검색
  </div>

  <hr class="border-rtblue my-2">

  <p>
    v-for 카드 리스트 나열
  </p>
  <div>
    <el-row>
      <el-col
        v-for="(o, index) in 2"
        :key="o"
        :span="8"
        :offset="index > 0 ? 2 : 0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div class="text-left">
            <p>moviename</p>
            <p>date</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss"></style>
