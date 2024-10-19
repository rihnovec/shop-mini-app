<script setup>
  import {NLayout, NGrid, NGi} from 'naive-ui'

  import FilterForm from '@/components/FilterForm.vue'
  import Catalog from '@/components/Catalog.vue'
</script>

<template>
  <n-layout>
    <n-grid cols="1 m:4" x-gap="12" responsive="screen">
      <n-gi>
        <FilterForm />
      </n-gi>
      <n-gi span="3">
        <Catalog />
      </n-gi>
    </n-grid>
  </n-layout>
</template>

<style scoped>

</style>
