<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '../stores/catalog-store/index'
import { IProductCategory } from '../typings/interfaces/IProductCategory'
import { TypeCategoryName } from '../typings/types/TypeCategoryName'

import {
  NGrid,
  NGi,
  NForm,
  NLayout,
  NLayoutContent,
  NCard,
  NSelect,
  NInput,
  NButton,
  NSpace,
  NEl,
} from 'naive-ui'

const catalogStore = useCatalogStore()
const { categories, selectedCategory, priceRange } = storeToRefs(catalogStore)
const { fetchCategories, resetFilter, applyFilter } = catalogStore

const minPriceValue: Ref<number> = ref(priceRange.value.min)
const maxPriceValue: Ref<number> = ref(priceRange.value.max)

watch(priceRange, range => {
  minPriceValue.value = range.min
  maxPriceValue.value = range.max
})

const options: Ref<IProductCategory[]> = computed((): IProductCategory[] => {
  const categoriesOptions = categories.value.map(
    (category: TypeCategoryName) => {
      return {
        label: category.slice(0, 1).toUpperCase() + category.slice(1),
        value: category,
      }
    },
  )

  return [
    {
      label: 'Все категории',
      value: 'all',
    },
    ...categoriesOptions,
  ]
})
const hasOptions: Ref<boolean> = computed(
  (): boolean => categories.value.length > 0,
)

function changeCategory(value: string, option: IProductCategory): void {
  selectedCategory.value = option
}

function allowInputCheck(value: string): boolean {
  return value.length === 0 || !Number.isNaN(+value)
}

function onInputMin(value: string): void {
  minPriceValue.value = +value
}

function onInputMax(value: string): void {
  maxPriceValue.value = +value
}

function onChangeFilterPrice(): void {
  minPriceValue.value = Math.max(priceRange.value.min, minPriceValue.value)

  maxPriceValue.value = Math.max(
    minPriceValue.value,
    Math.min(priceRange.value.max, maxPriceValue.value),
  )
}

function onSubmit(): void {
  applyFilter({
    price: {
      min: minPriceValue.value,
      max: maxPriceValue.value,
    },
  })
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <n-form @submit.prevent="onSubmit">
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <n-card
          title="Фильтр"
          :bordered="false"
          content-style="padding: 14px 0;"
          header-style="padding: 0"
        >
          <n-space vertical>
            <n-el class="control-title">Выберите категорию</n-el>
            <n-select
              :value="selectedCategory.value"
              :disabled="!hasOptions"
              :options="options"
              @update-value="changeCategory"
            />
          </n-space>
        </n-card>
        <n-card
          title="Цена"
          :bordered="false"
          content-style="padding: 14px 0;"
          header-style="padding: 0"
        >
          <n-space vertical>
            <n-grid x-gap="14" :cols="2">
              <n-gi>
                <n-space vertical>
                  <n-el class="control-title">Мин. цена $</n-el>
                  <n-input
                    :value="minPriceValue.toString()"
                    :allow-input="allowInputCheck"
                    placeholder="Мин. цена"
                    inputmode="number"
                    :on-change="onChangeFilterPrice"
                    :on-update:value="onInputMin"
                  />
                </n-space>
              </n-gi>
              <n-gi>
                <n-space vertical>
                  <n-el class="control-title">Макс. цена $</n-el>
                  <n-input
                    :value="maxPriceValue.toString()"
                    :allow-input="allowInputCheck"
                    placeholder="Макс. цена"
                    inputmode="number"
                    :on-change="onChangeFilterPrice"
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
            <n-button type="primary" attr-type="submit" block>
              Применить
            </n-button>
          </n-space>
        </n-layout-content>
      </n-layout-content>
    </n-layout>
  </n-form>
</template>

<style lang="scss" scoped>
.control-title {
  font-weight: 500;
}
</style>
