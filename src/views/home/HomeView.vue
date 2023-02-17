<template>
  <div class="home-view">
    <home-navbar></home-navbar>
    <home-main></home-main>
    <home-footer></home-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeNavbar from '@/components/home-navbar'
import HomeMain from '@/components/home-main'
import HomeFooter from '@/components/home-footer'

export default defineComponent({
  name: 'HomeView',
  components: {
    HomeNavbar,
    HomeMain,
    HomeFooter
  }
})
</script>
