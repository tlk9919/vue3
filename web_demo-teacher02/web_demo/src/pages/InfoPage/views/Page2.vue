<template>
  <div class="page-container" v-loading="loading">
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
        <div class="card-header">
          <span class="title">周数据统计</span>
        </div>
      </template>
      <div ref="chartRef" class="chart-container"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/utils/axios.js'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'

const statistics = ref([])
const chartRef = ref(null)
let chart = null
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get('/page2-data')
    statistics.value = [
      { label: '总用户数', value: response.totalUsers },
      { label: '活跃用户', value: response.activeUsers },
      { label: '总订单数', value: response.totalOrders },
      { label: '待处理订单', value: response.pendingOrders }
    ]
    if (response.weeklyStats) {
      initChart(response.weeklyStats)
    }
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const initChart = (data) => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '0%',
        right: '10%',
        bottom: '50%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.labels,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [{
        name: '数据量',
        type: 'line',
        smooth: true,
        data: data.values,
        areaStyle: {
          opacity: 0.2
        },
        symbol: 'circle',
        symbolSize: 9
      }]
    }
    chart.setOption(option)
    chart.resize() // 确保图表在初始化时也调用resize
  }
}


// 确保在组件卸载时销毁图表实例
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose()
  }
})

// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (chart) {
    chart.resize()
  }
})

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.page-container {
  padding: 10px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 60px);
  width: 100%;
  box-sizing: border-box;
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.chart-card {
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 300px);
}

.chart-container {
  height: calc(100% - 50px);
  width: 100%;
  min-height: 300px;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
}

.title {
  font-size: 16px;
  font-weight: bold;
}
</style>
