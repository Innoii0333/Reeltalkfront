<script setup lang="ts">
import { drawCylinder, rotateObject, rotateView } from '~/utils/Cylinder.js'
const router = useRouter()
const timeout = ref(5)
const canvasRef = ref(null)
let n = 0
let canvas: Nullable<Object>
let mainInterval: NodeJS.Timeout

const goMain = () => {
  mainInterval = setInterval(() => { timeout.value -= 1 }, 1000)
  setTimeout(() => {
    router.push('/main')
  }, 5000)
}
const goMainDirect = () => {
  clearTimeout(mainInterval)
  router.push('/main')
}
onMounted(() => {
  goMain()
  canvas = canvasRef.value
  if (!canvas)
    return
  // drawCylinder(canvas, 80, 200)
  rotateView(canvas, 2 * Math.PI / 3, drawCylinder)
})
const rotate = () => {
  n++
  rotateObject(canvas, 0.1 * n, rotateView, 2 * Math.PI / 3, drawCylinder)
}
</script>

<template>
  <div class="flex flex-col h-100vh ml-50 justify-center items-center">
    <canvas ref="canvasRef" width="80" height="200" @click="rotate" />
    <p class="">
      {{ timeout }}초 뒤 자동으로 이동합니다...
    </p>
    <el-button class="my-3" @click="goMainDirect">
      Enter
    </el-button>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bare
</route>
