<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
export default defineComponent({
  components: { ElConfigProvider },
  setup() {
    return { locale: zhCn }
  }
})
</script>
<style lang="less">
body {
  padding: 0;
  margin: 0;

  // 屏蔽 el-drawer 生成的 修改body的宽度
  width: 100vw !important;
  // overflow-y: overlay;
}
// 以下为了解决滚动条出现挤压页面宽度
html {
  overflow-y: scroll; //这是为了兼容ie8，不支持:root, vw
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  // overflow: hidden;
}
</style>
