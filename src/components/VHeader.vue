<script setup>
  import {
    NLayoutHeader,
    NLayoutContent,
    NFlex
  } from 'naive-ui'

  import HeaderLogo from '@/components/HeaderLogo.vue'
  import HeaderCart from '@/components/HeaderCart.vue'
</script>

<template>
  <n-layout-header bordered>
    <n-layout-content content-style="padding: 14px 24px;">
      <n-flex justify="space-between">
        <HeaderLogo />
        <HeaderCart />
      </n-flex>
    </n-layout-content>
  </n-layout-header>
</template>

<style scoped>

</style>
