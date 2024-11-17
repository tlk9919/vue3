<script>
import * as echarts from 'echarts'
import {onMounted, ref} from "vue";
import http from '@/utils/api.js'

export default {
  setup() {
    const chartRef = ref(null)
    const xAxisData = ref([])
    const seriesData = ref([])
    const title = ref('')
    const initChart = () => {
      let chartInstance = echarts.init(chartRef.value)
      const option = {
        title: {
          text: title.value
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          type: 'category',
          data: xAxisData.value
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '销量',
          type: 'bar',
          data: seriesData.value
        }]
      }
      chartInstance.setOption(option)
    }
    onMounted(async () => {
      try {
        await http.get('/data')
            .then((res) => {
              xAxisData.value = res.xAxisData
              seriesData.value = res.seriesData
              title.value = res.title
              initChart()
            })
      } catch (e) {
        console.error(e)
      }
    })
    return {
      chartRef
    }
  }
}

console.log(echarts)

</script>

<template>
  <h1>DashBoard</h1>
  <div ref="chartRef" style="width: 600px;height: 400px"></div>
</template>

<style scoped>

</style>
