<script setup>
  import {
    NLayoutHeader,
    NLayoutContent
  } from 'naive-ui'

  import {RouterLink} from 'vue-router'
</script>

<template>
  <n-layout-header bordered>
    <n-layout-content content-style="padding: 14px 24px;">
      <RouterLink to="/" class="header-logo">
        <img alt="Shop Mini App" width="32" src="/src/assets/logo.svg" />
      </RouterLink>
    </n-layout-content>
  </n-layout-header>
</template>

<style scoped>

</style>
