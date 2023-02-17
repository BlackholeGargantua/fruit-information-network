<template>
  <main-content :showLayout="props.showLayout" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import MainContent from '@/components/home-main/main-content'
const props = defineProps<{
  showLayout: boolean
}>()
</script>

<style scoped></style>
