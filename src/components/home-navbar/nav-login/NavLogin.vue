<template>
  <div class="login">
    <el-drawer
      close-on-press-escape
      v-model="loginDrawer"
      title="情报员"
      size="35%"
      @closed="closedDrawer"
    >
      <slot name="loginRegister-userPersonalInfo"></slot>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDrawer, ElButton } from 'element-plus'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    ElButton,
    ElDrawer
  },
  setup() {
    const store = useStore()

    // 是否展开 登录/注册 界面
    const loginDrawer = store.state.login.showLoginPage

    // 关闭 登录/注册 界面
    const closedDrawer = () => {
      store.commit('login/changeShowLoginPage', false)
    }

    return { loginDrawer, closedDrawer }
  }
})
</script>

<style lang="less" scoped>
@import url('@/style');
// 下面部分页面居中
:deep .el-drawer__body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
:deep .el-drawer__header {
  margin: 0;

  .el-icon {
    color: @option-color;
  }
}
</style>
