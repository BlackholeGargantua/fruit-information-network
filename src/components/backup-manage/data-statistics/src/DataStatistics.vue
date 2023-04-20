<template>
  <div class="data-statistics">
    <div ref="viewsRef" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from '@/store'
import cache from '@/utils/cache'
import * as echarts from 'echarts'

const store = useStore()

const viewsRef = ref<HTMLElement>()

const allFruitInfo = computed({
  set: () => store.state.fruit.allFruitInfo,
  get: () => store.state.fruit.allFruitInfo
})

onMounted(() => {
  const echartData: any = []
  if (JSON.stringify(echartData) !== '[]') {
    allFruitInfo.value
      .sort((x, y) => y.views! - x.views!)
      .slice(0, 10)
      .map((item) => {
        echartData.push({ value: item.views, name: item.scientific_name })
      })
  } else {
    cache
      .getCache('allFruitInfo')
      .sort((x: any, y: any) => y.views! - x.views!)
      .slice(0, 10)
      .map((item: any) => {
        echartData.push({ value: item.views, name: item.scientific_name })
      })
  }

  const echartsInstance = echarts.init(viewsRef.value!)
  const option = {
    title: {
      text: '水果浏览量前十',
      left: 'center'
    },
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        // dataView: { show: true, readOnly: false },
        // restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: true,
          formatter: '{b}: {c}'
        },
        data: echartData
      }
    ]
  }

  echartsInstance.setOption(option)
})
</script>

<style lang="less" scoped>
.data-statistics {
  width: 100%;
  height: 100%;
}
</style>
