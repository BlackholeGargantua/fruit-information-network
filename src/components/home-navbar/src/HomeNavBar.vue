<template>
  <div class="home-nav-bar">
    <el-menu
      :default-active="
        /^\/home.*/.test(router.currentRoute.value.path) ? '/home' : router.currentRoute.value.path
      "
      :ellipsis="false"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#5d3d21"
      text-color="#fff"
      active-text-color="#40a070"
    >
      <button class="nav-head-img" />
      <el-menu-item index="/home" @click="router.push('/home')">首页</el-menu-item>
      <el-menu-item index="/information" @click="router.push('/information')">资讯 </el-menu-item>
      <div class="flex-grow" />
      <nav-search v-show="/^\/home.*/.test(router.currentRoute.value.path)"></nav-search>
      <el-menu-item index="showLogin" style="padding-right: 30px" @click="showLoginPage">
        <div
          v-if="!!isShowUserPersonalOrLogin"
          style="display: flex; flex-direction: row; justify-content: center; gap: 10px"
        >
          <div class="demo-type">
            <el-avatar :size="40" :src="store.state.login.userPersonalInfo.avatar_url"> </el-avatar>
          </div>
          <span>{{ store.state.login.userPersonalInfo.username }}</span>
        </div>
        <p v-else>登录</p>
      </el-menu-item>
      <nav-login v-if="store.state.login.showLoginPage">
        <template #loginRegister-userPersonalInfo>
          <user-personal v-if="!!isShowUserPersonalOrLogin"></user-personal>
          <login-register v-else></login-register>
        </template>
      </nav-login>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ElAvatar, ElMenu, ElMenuItem } from 'element-plus'
import NavSearch from '@/components/home-navbar/nav-search/NavSearch.vue'
import NavLogin from '../nav-login/NavLogin.vue'
import LoginRegister from '@/components/login-register'
import UserPersonal from '@/components/user-personal-info'
export default defineComponent({
  components: {
    ElAvatar,
    ElMenu,
    ElMenuItem,
    NavSearch,
    NavLogin,
    LoginRegister,
    UserPersonal
  },
  setup() {
    // 引入路由
    const router = useRouter()
    // 引入store
    const store = useStore()

    // 菜单选中项下标
    const activeIndex = ref('1')

    // 展示用户信息还是登录界面  有值（true）就用户，没值（false）就登录
    const isShowUserPersonalOrLogin = computed(() => store.state.login.token)

    // 点击展示login页面
    const showLoginPage = () => {
      if (JSON.stringify(store.state.login.userPersonalInfo) == '{}')
        store.dispatch('login/tokenGetUserInfo')
      store.commit('login/changeShowLoginPage', true)
    }

    return {
      router,
      store,
      activeIndex,
      isShowUserPersonalOrLogin,
      showLoginPage
    }
  }
})
</script>

<style scoped lang="less">
.home-nav-bar {
  position: sticky; // 相比fixed不会脱离文档流
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  // margin-right: calc(100% - 100vw);
  .el-menu {
    height: 60px;
    display: flex;
    align-items: center;
    // 导航首图片样式
    .nav-head-img {
      height: 60px;
      width: 60px;

      background: url('@/assets/images/辉夜姬.jpg');
      border: 0;
    }

    /* 中间空格 */
    .flex-grow {
      flex-grow: 1;
    }
  }
  // 头像
  :deep .demo-type {
    margin-top: -7px;
  }
}
</style>
