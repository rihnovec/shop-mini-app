<script setup>
import {ref, computed, onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {useCatalogStore} from '@/stores/catalog-store/index.js'

import {
  NGrid,
  NGi,
  NLayout,
  NLayoutContent,
  NCard,
  NSelect,
  NInputNumber,
  NButton,
  NSpace,
  NEl
} from 'naive-ui'

const catalogStore = useCatalogStore()
const {categories, selectedCategoryValue, priceRange} = storeToRefs(catalogStore)
const {fetchCategories, resetFilter, applyFilter} = catalogStore

const options = computed(() => {
  const categoriesOptions = categories.value.map(category => {
    return {
      label: category.slice(0, 1).toUpperCase() + category.slice(1),
      value: category
    }
  })

  return [
    {
      label: 'Все категории',
      value: 'all'
    },
    ...categoriesOptions
  ]
})
const hasOptions = computed(() => categories.value.length > 0)

function changeCategory(value) {
  selectedCategoryValue.value = value
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-card title="Фильтр" :bordered="false" content-style="padding: 14px 0;" header-style="padding: 0">
        <n-space vertical>
          <n-el class="control-title">Выберите категорию</n-el>
          <n-select :value="selectedCategoryValue" :disabled="!hasOptions" :options="options" @update-value="changeCategory" />
        </n-space>
      </n-card>
      <n-card title="Цена" :bordered="false" content-style="padding: 14px 0;" header-style="padding: 0">
        <n-space vertical>
          <n-grid x-gap="14" :cols="2">
            <n-gi>
              <n-space vertical>
                <n-el class="control-title">Мин. цена $</n-el>
                <n-input-number
                  v-model:value="priceRange.min"
                  placeholder="Min"
                  :min="0"
                  :max="10000" :show-button="false"
                />
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <n-el class="control-title">Макс. цена $</n-el>
                <n-input-number
                  v-model:value="priceRange.max"
                  placeholder="Max"
                  :min="0"
                  :max="10000" :show-button="false"
                />
              </n-space>
            </n-gi>
          </n-grid>
        </n-space>
      </n-card>
      <n-layout-content>
        <n-space vertical>
          <n-button strong secondary block @click="resetFilter">
            Сброс
          </n-button>
          <n-button type="primary" block @click="applyFilter">
            Применить
          </n-button>
        </n-space>
      </n-layout-content>
    </n-layout-content>
  </n-layout>
</template>

<style lang="scss" scoped>
  .control-title {
    font-weight: 500;
  }
</style>
