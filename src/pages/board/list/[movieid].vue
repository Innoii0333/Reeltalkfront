<script setup>
const tableData = ref([])
const route = useRoute()
const router = useRouter()
const movie_id = route.params.movieId
const movie_name = ref('')
const titleSearch = ref('')

const pageSize = ref(10)
const currentPage = ref(1)
const totalPages = computed(() => {
  return Math.ceil(tableData.value.length / pageSize.value)
})
const pageNumbers = computed(() => {
  const numbers = []
  for (let i = 1; i <= totalPages.value; i++)
    numbers.push(i)
  return numbers
})

const pagedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return tableData.value.slice(startIndex, endIndex)
})
const goToPage = (pageNumber) => {
  if (pageNumber < 1)
    currentPage.value = 1

  else if (pageNumber > totalPages.value)
    currentPage.value = totalPages.value

  else
    currentPage.value = pageNumber
}
function prevPage() {
  currentPage.value--
}

function nextPage() {
  currentPage.value++
}

const inqueryPost = async () => {
  const res = await fetch('http://localhost:3000/post')
  const data = await res.json()
  tableData.value = data
}
const movetoPost = (row) => {
  const postPage = `/board/post/${movie_id}/${row.postno}`
  router.push(postPage)
}
const titleSearchClick = (titleSearch) => {

}
onMounted(async () => {
  inqueryPost()
})
</script>

<template>
  <div class="text-5 ml-3 px-auto text-left">
    <button @click="inqueryPost">
      {{ movie_id }} 게시판
    </button>
  </div>
  <hr class="border-rtblue my-2 border-2">
  <div>
    <table class="my-10 table-fixed">
      <tr>
        <td class="w-180 text-center">
          img
        </td>
        <td class="w-100% text-center">
          <ul>
            <li>
              111
            </li>
            <li>222</li>
          </ul>
        </td>
      </tr>
    </table>
  </div>

  <div>
    <span class="inline-block w-110 text-left text-3.5">페이지 당 게시글 수 : 10/20/30</span>
    <span class="inline-block w-120 text-right">
      <input v-model="titleSearch" type="text" class="border-rtgray px-1 my-1 w-50">
      <img src="/src/components/img/finder.png" alt="검색" width="23" style="margin-top: -2.4px;" outline="solid 2px #c0c0c0" inline-block @click="titleSearchClick">
    </span>
  </div>
  <hr class="border-rtblue my-2 border-2">
  <div>
    <el-table :data="tableData" style="width: 100%; border-collapse: collapse;">
      <el-table-column prop="postno" label="번호" width="180" />
      <el-table-column
        prop="title" label="제목" width="180" :show-overflow-tooltip="true"
        @cell-click="movetoPost"
      />
      <el-table-column prop="username" label="작성자" :show-overflow-tooltip="true" />
      <el-table-column prop="createAt" label="작성일시" :show-overflow-tooltip="true" />
      <el-table-column prop="viewCount" label="조회수" :show-overflow-tooltip="true" />
    </el-table>
    <hr class="border-rtblue my-2 border-1">
    <div class="pagination">
      <button class="mr-2" @click="goToPage(1)">
        &lt;&lt;
      </button>
      <button :disabled="currentPage === 1" class="mr-2" @click="prevPage">
        Prev
      </button>
      <button v-for="pageNumber in pageNumbers" :key="pageNumber" class="mr-2" @click="goToPage(pageNumber)">
        {{ pageNumber }}
      </button>
      <button :disabled="currentPage === totalPages" class="mr-2" @click="nextPage">
        Next
      </button>
      <button class="mr-2" @click="goToPage(totalPages)">
        &gt;&gt;
      </button>
    </div>
  </div>
</template>

<style lang="scss">
</style>
