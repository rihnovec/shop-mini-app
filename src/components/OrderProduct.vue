<script setup lang="ts">
import { NSpace, NImage, NEl } from 'naive-ui'

defineProps({
  title: String,
  image: String,
})

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="order-product">
    <n-space align="center">
      <n-image :src="image" width="60" height="60" object-fit="contain" />
      <n-el>{{ title }}</n-el>
    </n-space>
  </div>
</template>

<style scoped></style>
