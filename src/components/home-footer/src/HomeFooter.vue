<template>
  <div class="home-footer">
    <el-footer>
      <p>&copy; 水果情报网</p>
    </el-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElFooter } from 'element-plus'

export default defineComponent({
  components: {
    ElFooter
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
@import url('@/style');
.home-footer {
  .el-footer {
    background-color: @main-color;
    height: 108px;
    text-align: center;
    p {
      padding-top: 40px;
      color: rgb(212, 204, 204);
    }
  }
}
</style>
