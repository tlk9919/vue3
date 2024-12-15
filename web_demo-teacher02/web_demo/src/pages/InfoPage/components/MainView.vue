<template>
  <div class="main-view" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in statistics" :key="index">
        <el-card class="stat-card" :body-style="{ padding: '20px' }">
          <div class="stat-item">
            <div class="stat-value">{{ item.value || '0' }}</div>
            <div class="stat-label">{{ item.label }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="chart-card">
      <template #header>
        <div class="chart-header">
          <span>销售趋势</span>
        </div>
      </template>
      <div ref="chartRef" class="chart-container"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from '@/utils/axios.js'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const statistics = ref([])
const chartRef = ref(null)
let chart = null
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get('/dashboard-data')
    statistics.value = response.statistics
    if (response.salesTrend?.weekly) {
      initChart(response.salesTrend.weekly)
    }
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const handleResize = () => {
  chart?.resize()
}

const initChart = (data) => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    const option = {
      title: {
        text: '销售趋势',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.labels,
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: data.values,
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.3
        },
        itemStyle: {
          color: '#409EFF'
        },
        lineStyle: {
          width: 2
        }
      }]
    }
    chart.setOption(option)
  }
}

onMounted(() => {
  fetchData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<style scoped>
.main-view {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
}

.stat-card {
  height: 160px;
  margin-bottom: 20px;
}

.stat-item {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.chart-card {
  margin-top: 20px;
}

.chart-header {
  padding: 0 20px;
}

.chart-container {
  height: 400px;
  width: 100%;
}
</style>
