<template>
  <div class="info-view">
    <home-navbar></home-navbar>
    <info-detail></info-detail>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeNavbar from '@/components/home-navbar'
import InfoDetail from '@/components/info-detail'
export default defineComponent({
  components: {
    HomeNavbar,
    InfoDetail
  }
})
</script>
