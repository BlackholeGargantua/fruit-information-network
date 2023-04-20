<template>
  <div class="info-view">
    <home-navbar></home-navbar>
    <fruit-info></fruit-info>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeNavbar from '@/components/home-navbar'
import FruitInfo from '@/components/fruit-info'
export default defineComponent({
  components: {
    HomeNavbar,
    FruitInfo
  }
})
</script>
