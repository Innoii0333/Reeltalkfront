<script setup lang="ts">
import BarChart from './components/BarChart.vue'
import { blueChartData, redChartData } from './chartConfig'

const redColor = 'red'
const blueColor = 'blue'
</script>

<template>
  <div>
    <BarChart :chart-data="redChartData" color="red" />
    <BarChart :chart-data="blueChartData" color="blue" />
  </div>
</template>

