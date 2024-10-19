<script setup>
import {
  NLayout
} from 'naive-ui'

import VHeader from '@/components/VHeader.vue'
import VBody from '@/components/VBody.vue'
import {useRouter} from 'vue-router'

const router = useRouter()
</script>

<template>
  <n-layout>
    <VHeader v-if="router.currentRoute.value.name !== 'auth'" />
    <VBody />
  </n-layout>
</template>

<style scoped>

</style>
