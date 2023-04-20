<script setup>
const tableData = ref([])
const route = useRoute()
const router = useRouter()
const movie_id = route.params.movieId
const movie_name = ref('')
const keyword = ref('')
const pageSizeOptions = [10, 20, 30]
const pageSize = ref(pageSizeOptions[0])
const currentPage = ref(1)
const filteredPosts = ref(tableData.value)
const plot = ref('')
const director_nm = ref('')
const category_id = ref('')
const release_date = ref('')
const grade = ref('')
const star_avg_rate = ref('')
const poster_url = ref('/src/components/img/alt.png')

const inqueryPost = async () => {
  try {
    const res = await axios.get(`/api/movie/${movie_id}/post`)
    tableData.value = await res.data
  }
  catch (e) {
    alert('게시물 정보를 불러올 수 없습니다')
    console.error(e)
  }
}
const getMovie = async () => {
  try {
    const res = await axios.get(`/api/movie/${movie_id}`)
    const data = res.data
    movie_name.value = data.title
    director_nm.value = data.director_nm
    category_id.value = data.category_id.split(', ')// parse해서 array로 만들고 v-for, 조건 일치하는지 확인 필요함, 클릭시 각 카테고리 이동?
    release_date.value = data.release_date
    grade.value = data.grade
    star_avg_rate.value = data.star_avg_rate
    poster_url.value = `/app/web/images/${movie_id}.png` // ?
    await inqueryPost()
  }
  catch (e) {
    console.error(e)
    alert('영화 정보를 찾을 수 없습니다')
    router.push('/main')
  }
}

const movetoPost = (row) => {
  const postPage = `/board/post/${movie_id}/${row.postno}`
  router.push(postPage)
}

const updatePageSize = (option) => {
  pageSize.value = option
}
const titleSearch = () => {
  if (keyword.value === '') { filteredPosts.value = tableData.value }

  else {
    const lowerCaseKeyword = keyword.value.toLowerCase()
    filteredPosts.value = tableData.value.filter(post =>
      post.postTitle.toLowerCase().includes(lowerCaseKeyword),
    )
  }
}
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / pageSize.value)
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
  return filteredPosts.value.slice(startIndex, endIndex)
})
const goToPage = (pageNumber) => {
  if (pageNumber < 1)
    currentPage.value = 1

  else if (pageNumber > totalPages.value)
    currentPage.value = totalPages.value

  else
    currentPage.value = pageNumber
}
const prevPage = () => {
  currentPage.value--
}

const nextPage = () => {
  currentPage.value++
}
const goPostEdit = () => {
  router.push(`/board/postedit/${movie_id}`)
}
const goToCategory = (genre) => {
  switch (genre) {
    case '액션': router.push('/movielist/action')
      break
    case '멜로/로맨스': router.push('/movielist/romance')
      break
    case '애니': router.push('/movielist/ani')
      break
    case '드라마': router.push('/movielist/drama')
      break
    case '호러': router.push('/movielist/horror')
      break
    case 'SF': router.push('/movielist/sf')
      break
    case '판타지': router.push('/movielist/fantasy')
      break
    case '코메디': router.push('/movielist/comedy')
      break
    default :router.push('/movielist/etc')
  }
}

onMounted(async () => {
  await getMovie()
  filteredPosts.value = tableData.value
})
</script>

<template>
  <div class="text-5 ml-3 px-auto text-left">
    <button @click="inqueryPost">
      {{ movie_name }} 게시판
    </button>
  </div>
  <hr class="border-rtblue my-2 border-2">
  <div>
    <table class="my-10 table-fixed">
      <tr>
        <td class="w-180 text-center">
          <img :src="poster_url" class="object-fill" @error="poster_url.value = '/src/components/img/alt.png' ">
        </td>
        <td class="w-100% text-center">
          <ul>
            <li>
              {{ movie_name }}에 관한 내용을 다루는 게시판입니다
            </li>
            <li> {{ plot }}  </li>
            <li> {{ director_nm }}  </li>
            <li> <span v-for="{ categories, i } in category_id" :key="i" class="hover:underline-solid" @click="goToCategory(categories)">#{{ categories }} </span> </li>
            <li> {{ grade }} </li>
            <li> {{ release_date }}  </li>
            <li> {{ star_avg_rate }}  </li>
          </ul>
        </td>
      </tr>
    </table>
  </div>
  <!-- 페이징과 관련된 요소 1:pageSizeOptions -->
  <div>
    <span class="inline-block w-110 text-left text-3.5">페이지 당 게시글 수 :
      <span v-for="option in pageSizeOptions" :key="option">
        <button class="mx-1" :class="{ 'text-rtred': option === pageSize }" :disabled="option === pageSize" @click="updatePageSize(option)">
          {{ option }}
        </button>
        <span v-if="option !== pageSizeOptions[pageSizeOptions.length - 1]"> / </span>
      </span>
    </span>
    <!-- 검색 옵션 -->
    <span class="inline-block w-120 text-right">
      <input v-model="keyword" type="text" placeholder="검색" class="border-rtgray px-1 my-1 w-50" @keyup.enter="titleSearch">
      <button>
        <img
          src="/src/components/img/finder.png" alt="go" width="24" style="margin-top: -2.8px;"
          outline="solid 1.5px #c0c0c0" inline-block @click="titleSearch"
        > </button>
    </span>
  </div>
  <hr class="border-rtblue my-2 border-2">
  <!-- 게시물 테이블 -->
  <div>
    <el-table :data="pagedPosts" style="width: 100%; border-collapse: collapse;">
      <el-table-column prop="postno" label="번호" :min-width="40" :max-width="100" />
      <el-table-column
        prop="postTitle" label="제목" :min-width="300" :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          <button @click="movetoPost(row)">
            {{ row.postTitle }}
          </button>
          <span class="text-rtred ml-2">[{{ row.commentCount }}]</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="작성자" :min-width="70" :max-width="150" :show-overflow-tooltip="true" />
      <el-table-column prop="createAt" label="작성일시" :min-width="70" :max-width="100" :show-overflow-tooltip="true" />
      <el-table-column prop="viewCount" label="조회수" :min-width="50" :max-width="80" :show-overflow-tooltip="true" />
    </el-table>
    <hr class="border-rtblue my-2 border-1">
    <!-- 게시물 생성 버튼 -->
    <div class="mr-auto text-right">
      <el-button color="#151AA3" class="text-white" @click="goPostEdit">
        글쓰기
      </el-button>
    </div>
    <!-- 페이징 요소 2:pagenation -->
    <div class="pagination">
      <button class="mr-2" :disabled="currentPage === 1" @click="goToPage(1)">
        &lt;&lt;
      </button>
      <button :disabled="currentPage === 1" class="mr-2" @click="prevPage">
        Prev
      </button>
      <button
        v-for="pageNumber in pageNumbers" :key="pageNumber"
        :class="{ 'text-rtred': pageNumber === currentPage }" :disabled="pageNumber === currentPage"
        class="mr-2" @click="goToPage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button :disabled="currentPage === totalPages" class="mr-2" @click="nextPage">
        Next
      </button>
      <button class="mr-2" :disabled="currentPage === totalPages" @click="goToPage(totalPages)">
        &gt;&gt;
      </button>
    </div>
  </div>
</template>

<style lang="scss">
input.border-rtgray{
  outline-style: solid;
  outline-width: 1.5px;
  outline-color:#c0c0c0;
}
</style>
