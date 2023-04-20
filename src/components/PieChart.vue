<script setup>
import Chart from 'chart.js/auto'

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
})

const ctx = ref(null)

onMounted(() => {
  ctx.value = document.getElementById('canvas3').getContext('2d')
  const chart = new Chart(ctx.value, {
    type: 'pie',
    data: {
      labels: props.labels,
      datasets: [{
        label: props.label,
        backgroundColor: ['#b5141c', '#151aa3', '#000000', '#b0b0b0', '#f0f0f0'],
        data: props.data,
      }],
    },
    options: {
      responsive: true,
    },
  })
})
</script>

<template>
  <div>
    <canvas id="canvas3" ref="canvas3" style="width: 300px; height: 300px;" />
  </div>
</template>

