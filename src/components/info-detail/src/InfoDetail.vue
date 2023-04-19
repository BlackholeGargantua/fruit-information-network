<template>
  <div class="info-detail">
    <el-aside>
      <el-image :src="fruitInfoData.img_url" :initial-index="10" fit="cover"></el-image>
      <el-card class="box-card" shadow="never">
        <div
          class="text-item"
          v-for="info in simpleInfo"
          :key="info.id"
          v-show="fruitInfoData[info.value] != null"
        >
          {{ info.title + '：' + fruitInfoData[info.value] }}
        </div>
      </el-card>
      <el-tooltip v-if="collect.showColletIcon" :content="collect.tip" placement="bottom">
        <el-icon style="cursor: pointer" size="44" :color="collect.color" @click="isCollet"
          ><StarFilled
        /></el-icon>
      </el-tooltip>
    </el-aside>
    <el-main>
      <div class="demo-collapse">
        <el-collapse v-model="mainInfo[0].id" :accordion="true">
          <el-collapse-item
            v-for="info in mainInfo"
            :key="info.id"
            v-show="fruitInfoData[info.value] != null"
            :title="info.title"
            :name="info.id"
          >
            <div>{{ fruitInfoData[info.value] }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import {
  ElAside,
  ElMain,
  ElContainer,
  ElCard,
  ElImage,
  ElIcon,
  ElCollapse,
  ElCollapseItem,
  ElTooltip
} from 'element-plus'
import { StarFilled } from '@element-plus/icons-vue'
import { fruitInfoType } from './type'
export default defineComponent({
  components: {
    ElAside,
    ElContainer,
    ElCard,
    ElMain,
    ElImage,
    ElIcon,
    ElCollapse,
    ElCollapseItem,
    ElTooltip,

    StarFilled
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    interface newFruitInfoDataType {
      [key: string]: number // 声明对象类型
    }

    // 请求水果数据
    onBeforeMount(() => {
      store.dispatch('fruit/getFruitDetai', router.currentRoute.value.query.fruitName)
    })

    onMounted(() => {
      // 给浏览量+1
      if (JSON.stringify(store.state.fruit.fruitDetail) !== '{}') {
        const newFruitInfoData: newFruitInfoDataType = {}
        let fruit: any = store.state.fruit.fruitDetail
        for (let key in store.state.fruit.fruitDetail) {
          if (key === 'views') newFruitInfoData[key] = fruit[key] + 1
          else newFruitInfoData[key] = fruit[key]
        }
        store.dispatch('fruit/updateFruitInfoViews', newFruitInfoData)
      }
    })

    // 收藏
    const collect = reactive({
      showColletIcon: false,
      isCollet: false,
      tip: '点击收藏',
      color: '#c29a78'
    })

    // 水果内容详情
    const fruitInfoData: fruitInfoType = computed({
      set: () => store.state.fruit.fruitDetail,
      get: () => store.state.fruit.fruitDetail
    })

    // 登录的用户信息
    const loginUser = computed({
      set: () => store.state.login.userPersonalInfo,
      get: () => store.state.login.userPersonalInfo
    })

    // 重新分类数据，方便展示
    // 左侧信息
    const simpleInfo = [
      { id: 1, title: '学名', value: 'scientific_name' },
      { id: 2, title: '类别', value: 'type' },
      { id: 3, title: '拼音', value: 'pinyin' },
      { id: 4, title: '英文名', value: 'english_name' },
      { id: 5, title: '别称', value: 'nick_name' },
      { id: 6, title: '查阅量', value: 'views' },
      { id: 7, title: '更新时间', value: 'update_time' }
    ]
    // 右侧信息
    const mainInfo = [
      { id: 1, title: '基本信息', value: 'essential_information' },
      { id: 2, title: '分布地区', value: 'distribution_area' },
      { id: 3, title: '成熟期', value: 'mature_period' },
      { id: 4, title: '营养价值', value: 'nutritive_value' },
      { id: 5, title: '挑选方法', value: 'selection_method' },
      { id: 6, title: '食用吃法', value: 'edible_method' },
      { id: 7, title: '保存方法', value: 'saving_method' },
      { id: 8, title: '种植方法', value: 'planting_method' },
      { id: 9, title: '注意事项', value: 'matters_needing_attention' }
    ]

    // 监听水果信息的变化（目前只有跳转到 /info 页用到store.state.fruit.fruitDetail），如果其它页也用到不能再使用此逻辑
    watch(
      () => store.state.fruit.fruitDetail,
      (newValue, oldValue) => {
        // newValue 有值、不为空对象、不等于旧值
        if (
          JSON.stringify(newValue) &&
          JSON.stringify(newValue) != '{}' &&
          JSON.stringify(oldValue) !== JSON.stringify(newValue)
        ) {
          // 给用户添加历史记录
          let userPersonalInfo = store.state.login.userPersonalInfo
          console.log(JSON.stringify(userPersonalInfo))
          if (JSON.stringify(userPersonalInfo) !== '{}') {
            store.dispatch('user/addUserHistory', {
              uid: userPersonalInfo.id,
              fruit_name: newValue.scientific_name,
              type: newValue.type,
              img_url: newValue.img_url
            })
          }
        }
      }
      // { immediate: true }
    )

    interface oneCollectFruitInfoType {
      fruit_name?: string
      id?: number
      img_url?: string
      type?: string
      uid?: number
    }

    // 收藏的某个水果
    let oneCollectFruitInfo: oneCollectFruitInfoType = {}

    // 监听用户最新收藏记录
    watch(
      [() => store.state.login.favoriteRecords, () => store.state.login.userPersonalInfo],
      ([newfavoriteValue, newUserInfo]) => {
        // 判断用户信息是否为空
        if (JSON.stringify(newUserInfo) !== '{}') {
          // 显示收藏按钮
          collect.showColletIcon = true
          // 查找点击的水果是否在收藏列表
          const fruit: any = newfavoriteValue.find((item) => {
            return item.fruit_name === router.currentRoute.value.query.fruitName // 查找用户名为"Steve"的用户
          })
          oneCollectFruitInfo = { ...fruit }
          if (fruit !== undefined) {
            collect.isCollet = true
            collect.color = '#40a070'
            collect.tip = '点击取消收藏'
          } else {
            collect.isCollet = false
            collect.color = '#c29a78'
            collect.tip = '点击收藏'
          }
        }
      },
      { immediate: true }
    )

    // 点击收藏后操作
    const isCollet = () => {
      collect.isCollet = !collect.isCollet
      if (collect.isCollet) {
        collect.tip = '点击取消收藏'
        collect.color = '#40a070'
        // 添加收藏
        store.dispatch('user/addUserfavoriteRecords', {
          uid: loginUser.value.id,
          fruit_name: fruitInfoData.value.scientific_name,
          type: fruitInfoData.value.type,
          img_url: fruitInfoData.value.img_url
        })
      } else {
        collect.tip = '点击收藏'
        collect.color = '#c29a78'
        store.dispatch('user/deleteUserfavoriteRecords', {
          uid: loginUser.value.id,
          id: oneCollectFruitInfo.id
        })
      }
    }

    return {
      fruitInfoData,
      mainInfo,
      simpleInfo,
      collect,
      isCollet
    }
  }
})
</script>

<style scoped lang="less">
@import url('@/style');
.info-detail {
  display: flex;
  flex-direction: row;
  min-width: 600px;
  min-height: calc(100vh - 68px);
  gap: 40px;
  margin: 8px 12% 0 12%;

  // 左半区样式
  .el-aside {
    flex: 2;
    width: 300px;
    background-color: @main-color;
    text-align: center;

    // 图片样式
    .el-image {
      border-radius: 4px;
      margin: 25px;

      // 图片阅览的 X 按钮
      :deep(.el-image-viewer__wrapper) {
        margin-top: 30px;
      }
    }

    // 卡片样式
    .box-card {
      border: 0;
      background-color: rgba(255, 255, 255, 0);
      .text-item {
        color: aliceblue;
        font-size: 14px;
        text-align: left;
        padding: 18px 0 18px 50px;
      }
    }
  }

  // 右半区样式
  .el-main {
    flex: 5;
    --el-main-padding: 0;
    overflow-y: hidden;

    // 标题样式
    :deep(.el-collapse-item__header) {
      --el-collapse-header-font-size: 16px;
      font-style: normal;
    }
    // 内容样式
    :deep(.el-collapse-item__content) {
      font-size: 12px;
    }
    // 点开的图片样式
    .demo-image__error .el-image {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
