<template>
  <div class="user-personal">
    <div class="base-info">
      <div class="demo-type">
        <el-avatar :size="80" :src="userPersonalInfo.avatar_url"> </el-avatar>
      </div>
    </div>
    <div class="other-info">
      <el-card shadow="always" class="user"> 代号：{{ userPersonalInfo.username }} </el-card>
      <el-collapse accordion>
        <el-collapse-item title="浏览记录" name="1" class="history">
          <template v-for="history in historyRecords" :key="history.id">
            <a
              style="text-decoration: none"
              :href="WEB_URL + '/info?fruitName=' + history.fruit_name"
            >
              <el-card shadow="hover">
                <div class="card-content">
                  <img :src="history.img_url" style="height: 50px; width: auto; display: block" />
                  <span>{{ history.fruit_name }}</span>
                  <span>{{ history.type }}</span>
                </div>
              </el-card>
            </a>
          </template>
        </el-collapse-item>
        <el-collapse-item title="收藏记录" name="2" class="favorite">
          <template v-for="favorite in favoriteRecords" :key="favorite.id">
            <a
              style="text-decoration: none"
              :href="WEB_URL + '/info?fruitName=' + favorite.fruit_name"
            >
              <el-card shadow="hover">
                <div class="card-content">
                  <img :src="favorite.img_url" style="height: 50px; width: auto; display: block" />
                  <span>{{ favorite.fruit_name }}</span>
                  <span>{{ favorite.type }}</span>
                </div>
              </el-card>
            </a>
          </template>
        </el-collapse-item>
      </el-collapse>
      <el-button
        type="success"
        :loading="isShowButtonLoading"
        @click="router.push('/backup')"
        v-if="store.state.login.userPersonalInfo.role === 'admin'"
        >进入后台管理</el-button
      >
    </div>
    <div class="loginOutButton">
      <el-button type="success" :loading="isShowButtonLoading" @click="loginOut"
        >退出登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ElAvatar, ElButton, ElCard, ElCollapse, ElCollapseItem } from 'element-plus'
import localeCache from '@/utils/cache'
import elMessage from '@/hooks/el-message'

export default defineComponent({
  components: {
    ElAvatar,
    ElButton,
    ElCard,
    ElCollapse,
    ElCollapseItem
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const WEB_URL = process.env.VUE_APP_WEB_URL

    // 获取个人用户信息
    const userPersonalInfo = computed(() => store.state.login.userPersonalInfo)

    // 获取历史记录
    const historyRecords = computed(() => store.state.login.historyRecords)

    // 获取收藏记录
    const favoriteRecords = computed(() => store.state.login.favoriteRecords)

    // 是否显示按钮加载中
    let isShowButtonLoading = computed(() => store.state.login.showButtonLoading)

    // 退出登录
    const loginOut = async () => {
      // 清空保存的用户数据
      store.commit('login/changeUserInfoAndToken', {})
      store.commit('login/changeShowLoginPage', false)
      localeCache.deleteCache('token')
      elMessage({ message: '已退出登录', type: 'success' })
      store.commit('login/changeShowButtonLoading', false)
      router.go(0)
    }

    // 图片加载失败
    const errorHandler = () => true
    return {
      router,
      store,
      userPersonalInfo,
      isShowButtonLoading,
      historyRecords,
      favoriteRecords,
      WEB_URL,
      loginOut,
      errorHandler
    }
  }
})
</script>

<style lang="less" scoped>
@import url('@/style');
.user-personal {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  // background: linear-gradient(to bottom, rgb(255, 255, 255), #5d3d21);

  // 上部分基本信息
  .base-info {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: rgb(247, 247, 247);
  }
  // 中部分其它信息
  .other-info {
    flex: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    .user {
      width: 250px;
      margin-top: -30px;
      text-align: center;
      color: @main-color;
    }
    .el-collapse {
      width: 100%;
      margin: 20px 0;
    }
    .history,
    .favorite {
      .el-card {
        margin: 15px 0;
      }
      .card-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  // 下部分按钮
  .loginOutButton {
    // background-color: white;
    padding: 25px 0;
    text-align: center;

    // 退出登录按钮 未选中颜色
    :deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      color: @main-color;
    }

    .el-button--success {
      width: 250px;
      --el-button-bg-color: @option-color;
    }

    // 退出登录按钮 选中颜色
    :deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      color: @option-color;
    }
    // 鼠标悬浮 退出登录按钮 颜色
    :deep .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
      color: @option-color;
    }
  }
}
</style>
