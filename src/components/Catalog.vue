<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '../stores/catalog-store/index'

import {
  NLayoutContent,
  NSpace,
  NFlex,
  NGrid,
  NGi,
  NH3,
  NResult,
  NButton,
} from 'naive-ui'
import CatalogCard from './CatalogCard.vue'

const catalogStore = useCatalogStore()
const { items, catalogTitle } = storeToRefs(catalogStore)
const { fetchProducts, setPriceRange, resetFilter } = catalogStore

onMounted(async () => {
  await fetchProducts()

  const minProductsPrice: number = Math.min(
    ...items.value.map(product => +product.price),
  )
  const maxProductsPrice: number = Math.max(
    ...items.value.map(product => +product.price),
  )
  setPriceRange({
    min: minProductsPrice,
    max: maxProductsPrice,
  })
})
</script>

<template>
  <n-layout-content content-style="padding: 24px;">
    <n-space vertical>
      <n-h3>{{ catalogTitle }}</n-h3>
      <n-grid
        cols="1 500:2 800:3 980:4"
        x-gap="20"
        y-gap="20"
        v-if="items.length > 0"
      >
        <n-gi v-for="product in items" :key="product.id">
          <CatalogCard v-bind="product" />
        </n-gi>
      </n-grid>
      <n-flex align="center" justify="center" v-else>
        <n-result
          status="info"
          title="Товары не найдены"
          description="Выберите другую категорию или поменяйте параметры фильтра"
        >
          <template #footer>
            <n-button @click="resetFilter">Сбросить фильтр</n-button>
          </template>
        </n-result>
      </n-flex>
    </n-space>
  </n-layout-content>
</template>

<style lang="scss" scoped></style>
