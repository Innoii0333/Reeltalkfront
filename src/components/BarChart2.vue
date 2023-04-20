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
  ctx.value = document.getElementById('canvas2').getContext('2d')
  const chart = new Chart(ctx.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [{
        label: props.label,
        backgroundColor: '#b5141c',
        data: props.data,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
      barThickness: 30,
    },
  })
})
</script>

<template>
  <div>
    <canvas id="canvas2" ref="canvas2" />
  </div>
</template>
