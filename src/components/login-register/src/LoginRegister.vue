<template>
  <div class="login-register">
    <el-tabs
      type="border-card"
      class="demo-tabs"
      stretch
      @tab-click="selectLoginOrRegister"
      v-model="currentTab"
    >
      <el-tab-pane name="登录">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>登录</span>
          </span>
        </template>
        <login-account ref="loginRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="注册">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Tickets /></el-icon>
            <span>注册</span>
          </span>
        </template>
        <register-account ref="registerRef"></register-account
      ></el-tab-pane>
    </el-tabs>
    <div class="control-account" v-show="isShowControlPassword">
      <el-checkbox v-model="isKeep">记住密码</el-checkbox>
      <el-link type="success">忘记密码</el-link>
    </div>
    <el-button
      type="success"
      :loading="isShowButtonLoading"
      class="login-btn"
      @click="handleLoginClick"
      >{{ currentTab }}</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import LoginAccount from '../login-account/LoginAccount.vue'
import RegisterAccount from '../register-account/RegisterAccount.vue'
import { ElButton, ElCheckbox, ElLink, ElTabs, ElTabPane, ElIcon } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { User, Tickets } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    LoginAccount,
    RegisterAccount,

    ElButton,
    ElCheckbox,
    ElLink,
    ElTabs,
    ElTabPane,
    ElIcon,

    User,
    Tickets
  },
  setup() {
    const store = useStore()

    // 是否隐藏 忘记密码/记住密码
    let isShowControlPassword = ref(true)

    // 选择 登录/注册 触发
    const currentTab = ref<string>('登录')

    // 是否显示按钮加载中
    let isShowButtonLoading = computed(() => store.state.login.showButtonLoading)

    const selectLoginOrRegister = (pane: TabsPaneContext) => {
      if (pane.props.name === '注册')
        (isShowControlPassword.value = false), (currentTab.value = '注册')
      else (isShowControlPassword.value = true), (currentTab.value = '登录')
    }

    // 记住密码
    const isKeep = ref(false)

    // 绑定登录逻辑
    const loginRef = ref<InstanceType<typeof LoginAccount>>()
    // 绑定注册逻辑
    const registerRef = ref<InstanceType<typeof RegisterAccount>>()

    // 点击 登录/注册
    const handleLoginClick = () => {
      // 开启按钮动画
      store.commit('login/changeShowButtonLoading', true)
      if (currentTab.value === '登录') loginRef.value?.loginAction(isKeep.value)
      else if (currentTab.value === '注册') registerRef.value?.registerAction()
    }

    return {
      currentTab,
      isShowControlPassword,
      isShowButtonLoading,
      isKeep,
      loginRef,
      registerRef,
      selectLoginOrRegister,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
@import url('@/style');

.login-register {
  width: 80%;

  .demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
  }
  .demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
  }

  // 登录/注册 未选中颜色
  :deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: @main-color;
  }

  // 登录/注册 选中颜色
  :deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: @option-color;
  }
  // 鼠标悬浮 登录/注册 颜色
  :deep .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: @option-color;
  }

  // 记住/忘记 密码
  .control-account {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  //记住密码
  .el-checkbox {
    color: @main-color;
    --el-checkbox-checked-text-color: @option-color;
    --el-checkbox-checked-icon-color: @main-color;
    --el-checkbox-checked-bg-color: @option-color;
  }

  // 忘记密码
  .el-link.el-link--success {
    --el-link-text-color: @main-color;
  }

  // 按钮
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
  .el-button--success {
    --el-button-bg-color: @option-color;
  }
}
</style>
