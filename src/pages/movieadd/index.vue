<script setup>
// use router
const router = useRouter()
const goBack = () => {
  // vue router를 활용해서 이전 페이지로 이동
  router.back()
}
</script>

<template>
  <h1 class="w-128 mx-auto text-2xl text-left">
    영화 등록페이지
  </h1>
  <hr class="w-128 border-black mx-auto">
  <div class="w-128 text-right mx-auto">
    검색창 json 서버 db
  </div>
  <div>
    <p>
      v-for 이용한 카드형식 리스트 출력
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
    <div class="w-128 text-right mx-auto">
      <el-button color="#c0c0c0" @click="goBack">
        뒤로가기
      </el-button>
      <el-button color="#151AA3" class="text-white">
        등록하기
      </el-button>
    </div>
  </div>
</template>

<style lang="scss">
.image {
  width: 50%;
  display: block;
}
</style>
