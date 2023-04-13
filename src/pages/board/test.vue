<script>
</script>

<template>
  <div>
    <hr class="mb-0 mt-2 mx-auto border-rtblue border-2">
    <div class="bg-rtgray my-0 mx-auto flex items-center">
      <textarea
        v-model="reply"
        class="border-0.5 border-black px-1 py-1 my-2 mr-0 ml-auto min-h-18 min-w-2xl text-3 leading-normal"
        placeholder="타인의 명예를 훼손하거나 권리를 침해하는 댓글은 운영 원칙 및 관련 법률의 제재를 받을 수 있습니다"
      />
      <el-button color="#151AA3" class="text-white min-h-18 ml-0 mr-auto" @click="submitForm">
        <slot>
          <span class="leading-4.5">
            댓글  <br>
            등록
          </span>
        </slot>
      </el-button>
    </div>
    <hr class="mt-0 mb-2 mx-auto border-rtblue border-2">
  </div>
</template>
