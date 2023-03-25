<template>
  <div class="user-personal">
    <div class="base-info">
      <div class="demo-type">
        <el-avatar :size="80" :src="userPersonalInfo.avatar_url"> </el-avatar>
      </div>
    </div>
    <div class="other-info">
      <el-card shadow="always"> 代号：{{ userPersonalInfo.username }} </el-card>
      <el-collapse accordion>
        <el-collapse-item title="关注列表" name="1">
          <div>
            Consistent with real life: in line with the process and logic of real life, and comply
            with languages and habits that the users are used to;
          </div>
        </el-collapse-item>
        <el-collapse-item title="历史记录" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their operations by style
            updates and interactive effects;
          </div>
        </el-collapse-item>
      </el-collapse>
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

    // 获取个人用户信息
    const userPersonalInfo = computed(() => store.state.login.userPersonalInfo)

    // 是否显示按钮加载中
    let isShowButtonLoading = computed(() => store.state.login.showButtonLoading)

    // 退出登录
    const loginOut = () => {
      // 开启按钮动画
      store.commit('login/changeShowButtonLoading', true)
      // 清空保存的用户数据
      store.commit('login/changeUserInfoAndToken', {})
      localeCache.deleteCache('token')
      elMessage({ message: '已退出登录', type: 'success' })
      store.commit('login/changeShowButtonLoading', false)
    }

    // 图片加载失败
    const errorHandler = () => true
    return { userPersonalInfo, isShowButtonLoading, loginOut, errorHandler }
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
    // justify-content: center;
    align-items: center;
    // width: 100%;
    padding: 0 20px;
    .el-card {
      width: 250px;
      margin-top: -30px;
      text-align: center;
      color: @main-color;
    }
    .el-collapse {
      width: 100%;
      margin: 20px 0;
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
