<script setup>
</script>

<template>
  <div class="ml-3 px-auto text-left">
    moviename
  </div>
  <hr class="border-rtblue my-2">
  <div>
    <table class="px-auto">
      <tr class="text-16px h-12 py-auto">
        <th class="w-30">
          postid
        </th>
        <th class="text-left w-auto" colspan="4">
          제목
        </th>
      </tr>
      <tr class="text-12px align-top h-13">
        <td class="w-30">
          닉네임은최대10자로
        </td>
        <td class="text-left w-200">
          2023-03-31 15:30
        </td>
        <td class="w-50">
          <el-rate
            v-if="value"
            v-model="value"
            disabled
            show-score
            :colors="['#B5141C', '#B5141C', '#B5141C']"
            score-template="평점 {value} 점"
          />
          <span v-else>평점 미등록</span>
        </td>
        <td class="w-15">
          조회 : 3
        </td>
        <td class="w-15">
          댓글 : 2
        </td>
      </tr>
    </table>
    <div class="text-left">
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
      <p> 내용</p>
    </div>
    <div class="mx-auto text-right">
      <button>수정</button>
      <button>삭제</button>
    </div>
  </div>
  <div>
    컴포넌트-댓글
  </div>
</template>

<style lang="scss"></style>
