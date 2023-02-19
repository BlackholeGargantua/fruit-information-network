<template>
  <router-view />
</template>
<style lang="less">
body {
  padding: 0;
  margin: 0;
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
