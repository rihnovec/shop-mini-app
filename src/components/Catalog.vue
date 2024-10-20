<script setup>
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {useCatalogStore} from '@/stores/catalog-store/index.js'

import {
  NLayoutContent,
  NSpace,
  NGrid,
  NGi,
  NH3
} from 'naive-ui'
import CatalogCard from './CatalogCard.vue'

const catalogStore = useCatalogStore()
const {items, selectedCategoryTitle} = storeToRefs(catalogStore)
const {fetchProducts, setPriceRange} = catalogStore

onMounted(async () => {
  await fetchProducts()

  const minProductsPrice = Math.min(...items.value.map(product => +product.price))
  const maxProductsPrice = Math.max(...items.value.map(product => +product.price))
  setPriceRange({
    min: minProductsPrice,
    max: maxProductsPrice
  })
})
</script>

<template>
  <n-layout-content content-style="padding: 24px;">
    <n-space vertical>
      <n-h3>{{selectedCategoryTitle}}</n-h3>
      <n-grid cols="1 500:2 800:3 980:4" x-gap="20" y-gap="20" v-if="items.length > 0">
        <n-gi v-for="product in items" :key="product.id">
          <CatalogCard v-bind="product" />
        </n-gi>
      </n-grid>
    </n-space>
  </n-layout-content>
</template>

<style lang="scss" scoped>

</style>
