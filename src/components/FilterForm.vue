<script setup>
import {ref, computed} from 'vue'

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

const selectedCategory = ref('')
const options = ref([
  {
    label: 'Категория 1',
    value: 'category1'
  },
  {
    label: 'Категория 2',
    value: 'category2'
  },
  {
    label: 'Категория 3',
    value: 'category3'
  },
  {
    label: 'Категория 4',
    value: 'category4'
  },
])

const price = ref({
  min: 0,
  max: 10000
})

const hasOptions = computed(() => options.value.length > 0)
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <n-card title="Фильтр" :bordered="false" content-style="padding: 14px 0;" header-style="padding: 0">
        <n-space vertical>
          <n-el class="control-title">Выберите категорию</n-el>
          <n-select v-model="selectedCategory" default-value="Не выбрано" :disabled="!hasOptions" :options="options" />
        </n-space>
      </n-card>
      <n-card title="Цена" :bordered="false" content-style="padding: 14px 0;" header-style="padding: 0">
        <n-space vertical>
          <n-grid x-gap="14" :cols="2">
            <n-gi>
              <n-space vertical>
                <n-el class="control-title">Мин. цена</n-el>
                <n-input-number
                  v-model:value="price.min"
                  placeholder="Min"
                  :min="0"
                  :max="10000" :show-button="false"
                />
              </n-space>
            </n-gi>
            <n-gi>
              <n-space vertical>
                <n-el class="control-title">Макс. цена</n-el>
                <n-input-number
                  v-model:value="price.max"
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
          <n-button strong secondary block>
            Сброс
          </n-button>
          <n-button type="primary" block>
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
