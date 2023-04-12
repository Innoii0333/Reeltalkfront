<script setup>
const titleSearch = (keyword) => {
  if (keyword.value === '') { filteredMovies.value = tableData.value }

  else {
    const lowerCaseKeyword = keyword.toLowerCase()
    filteredPosts.value = tableData.value.filter(post =>
      post.postTitle.toLowerCase().includes(lowerCaseKeyword),
    )
  }
}
</script>

<template>
  <div class="ml-3 px-auto text-left">
    Category
  </div>
  <div class="text-right">
    <!-- 검색 옵션 -->
    <span class="inline-block w-120 text-right">
      <input v-model="keyword" type="text" class="border-rtgray px-1 my-1 w-50" @keyup.enter="titleSearch(keyword)">
      <button>
        <img
          src="/src/components/img/finder.png" alt="검색" width="24" style="margin-top: -2.8px;"
          outline="solid 1.5px #c0c0c0" inline-block @click="titleSearch(keyword)"
        > </button>
    </span>
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
