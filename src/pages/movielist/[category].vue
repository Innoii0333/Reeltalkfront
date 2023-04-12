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
    <el-row :gutter="20">
      <el-col
        v-for="(o, index) in searchInfo"
        :key="index"
        class="mb-8"
        :span="6"
      >
        <el-card :body-style="{ padding: '3px', border: isActive === index ? '2px solid #151AA3' : 'none' }" @click="handleCardActive(index)">
          <img
            :src="searchInfo[index].poster_url" alt="알트"
            class="card-image"
          >
          <div class="text-left text-sm">
            <p> {{ searchInfo[index].title }} </p>
            <p> {{ searchInfo[index].release_date }} </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss"></style>
