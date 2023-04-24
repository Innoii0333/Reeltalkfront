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
  ctx.value = document.getElementById('canvas').getContext('2d')
  const chart = new Chart(ctx.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [{
        label: props.label,
        backgroundColor: '#151aa3',
        data: props.data,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: [{
          ticks: {
            beginAtZero: true,
            fontSize: 20,
          },
        }],
      },
      barThickness: 20,
    },
  })
})
</script>

<template>
  <div>
    <canvas id="canvas" ref="canvas" />
  </div>
</template>
