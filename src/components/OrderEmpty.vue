<script setup>
import {useRouter} from 'vue-router'

import {
  NFlex,
  NResult,
  NButton
} from 'naive-ui'

const router = useRouter()

function goToCatalog() {
  router.push({name: 'home'})
}

</script>

<template>
  <n-flex align="center" justify="center" class="order-empty">
    <n-result
        title="Корзина пуста">
      <template #icon></template>
      <template #footer>
        <n-button type="primary" @click="goToCatalog">Вернуться к покупкам</n-button>
      </template>
    </n-result>
  </n-flex>
</template>

<style lang="scss" scoped>

</style>
