<template>
  <home-navbar></home-navbar>
  <information-content></information-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeNavbar from '@/components/home-navbar'
import InformationContent from '@/components/information-content'

export default defineComponent({
  components: { HomeNavbar, InformationContent }
})
</script>
