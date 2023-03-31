<script setup>
const tableData = ref([
  {
    movieid: '11',
    postno: '1',
    title: '오 첫글이다',
    username: '131',
    userid: 'user111',
    content: 'ㅈㄱㄴ',
    createAt: '2023-03-31',
    viewCount: '1234141',
    commentCount: '0',
    updateAt: '2023-03-31',
  },
  {
    movieid: '11',
    postno: '2',
    title: '오 첫글이다',
    username: '141',
    userid: 'user111',
    content: 'ㅈㄱㄴ',
    createAt: '2023-03-31',
    starrate: '5.0',
    viewCount: '1234141',
    commentCount: '0',
    updateAt: '2023-03-31',
  },
  {
    movieid: '11',
    postno: '3',
    title: '오 첫글이다',
    username: '151',
    userid: 'user111',
    content: 'ㅈㄱㄴ',
    createAt: '2023-03-31',
    starrate: '5.0',
    viewCount: '1234141',
    commentCount: '0',
    updateAt: '2023-03-31',
  },
])
const inqueryPost = async () => {
  const res = await fetch('http://localhost:3000/post')
  const data = res.json()
  tableData.value = data.map(post => post)
}
</script>

<template>
  <div>
    moviename
    <button @click="inqueryPost">
      게시판
    </button>
  </div>
  <div>
    표시갯수 10/20/30
    검색
  </div>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="postno" label="번호" width="180" />
      <el-table-column prop="title" label="제목" width="180" />
      <el-table-column prop="username" label="작성자" />
      <el-table-column prop="createAt" label="작성일시" />
      <el-table-column prop="viewCount" label="조회수" />
    </el-table>
    <div>
      &lt;&lt; &lt; 1 2 3 4 5 6 7 8 9 10 &gt; &gt;&gt;
    </div>
    <ul>
      <li v-for="post in tableData" :key="`tableData-${post.postno}`">
        {{ post.title }} , {{ post.username }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss"></style>
