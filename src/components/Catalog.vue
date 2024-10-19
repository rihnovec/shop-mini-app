<script setup>
  import {
    NLayoutContent,
    NSpace,
    NGrid,
    NGi,
    NCard,
    NH3
  } from 'naive-ui'
</script>

<template>
  <n-layout-content content-style="padding: 24px;">
    <n-space vertical>
      <n-h3>Все категории</n-h3>
      <n-grid cols="1 500:2 800:3 980:4" x-gap="20" y-gap="20">
        <n-gi>
          <n-card title="Название товара"></n-card>
        </n-gi>
        <n-gi>
          <n-card title="Название товара"></n-card>
        </n-gi>
        <n-gi>
          <n-card title="Название товара"></n-card>
        </n-gi>
        <n-gi>
          <n-card title="Название товара"></n-card>
        </n-gi>
        <n-gi>
          <n-card title="Название товара"></n-card>
        </n-gi>
      </n-grid>
    </n-space>
  </n-layout-content>
</template>

<style scoped>

</style>
