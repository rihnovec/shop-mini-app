<script setup>
import {ref, computed, onMounted, watch} from 'vue'
import {storeToRefs} from 'pinia'
import {useCatalogStore} from '@/stores/catalog-store/index.js'

import {
  NGrid,
  NGi,
  NLayout,
  NLayoutContent,
  NCard,
  NSelect,
  NInput,
  NButton,
  NSpace,
  NEl
} from 'naive-ui'

const catalogStore = useCatalogStore()
const {categories, selectedCategoryValue, priceRange} = storeToRefs(catalogStore)
const {fetchCategories, resetFilter, applyFilter} = catalogStore

const minPriceValue = ref(priceRange.value.min)
const maxPriceValue = ref(priceRange.value.max)

watch(priceRange, range => {
  minPriceValue.value = range.min
  maxPriceValue.value = range.max
})

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

function allowInputCheck(value) {
  return value.length === 0 || !Number.isNaN(+value)
}

function onInputMin(value) {
  minPriceValue.value = value
}

function onInputMax(value) {
  maxPriceValue.value = value
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
                <n-input
                  :value="minPriceValue"
                  :allow-input="allowInputCheck"
                  placeholder="Мин. цена"
                  inputmode="number"
                  :on-update:value="onInputMin"
                />
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <n-el class="control-title">Макс. цена $</n-el>
                <n-input
                  :value="maxPriceValue"
                  :allow-input="allowInputCheck"
                  placeholder="Макс. цена"
                  inputmode="number"
                  :on-update:value="onInputMax"
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
