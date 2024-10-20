<script setup>
import {ref, computed} from 'vue'
import {storeToRefs} from 'pinia'
import {useCartStore} from '@/stores/cart-store/index.js'
import {useRouter} from 'vue-router'

import {
  NH1,
  NEl,
  NDataTable,
  NButton,
  NModal,
  NCard,
  NSpace,
  NFlex
} from 'naive-ui'

const cartStore = useCartStore()
const {quantity, items} = storeToRefs(cartStore)
const {clearCart} = cartStore

const tableItems = computed(() => {
  return items.value.map((product, index) => ({
    ...product,
    index: index + 1,
    totalPrice: product.price * product.quantity
  }))
})

const totalSum = computed(() => tableItems.value.reduce((sum, product) => sum + product.totalPrice, 0).toFixed(2))

const columns = ref([
  {
    title: '№',
    key: 'index'
  },
  {
    title: 'Наименование товара',
    key: 'title'
  },
  {
    title: 'Количество',
    key: 'quantity'
  },
  {
    title: 'Цена за ед. $',
    key: 'price'
  },
  {
    title: 'Итого $',
    key: 'totalPrice'
  },
])

const orderId = ref(12345)
const orderMessageShown = ref(false)
const router = useRouter()

function createOrder() {
  orderMessageShown.value = true
}

function closeOrderMessage() {
  orderMessageShown.value = false
  clearCart()
  router.push({name: 'home'})
}
</script>

<template>
  <n-h1>Товары в корзине</n-h1>
  <n-space vertical size="large">
    <n-data-table :columns="columns" :data="tableItems" />
    <n-flex align="center" justify="space-between">
      <n-el class="order-total-text">Всего товаров {{quantity}} на сумму ${{totalSum}}</n-el>
      <n-button type="primary" attr-type="button" @click="createOrder">Оформить заказ</n-button>
    </n-flex>
  </n-space>
  <n-modal v-model:show="orderMessageShown">
    <n-card :title="'Заказ №' + orderId" class="order-modal">
      <n-el class="order-modal-text">Ваш заказ успешно оформлен</n-el>
      <template #footer>
        <n-space justify="center">
          <n-button ghost type="primary"
                    class="order-modal-close"
                    attr-type="button"
                    @click="closeOrderMessage">Закрыть</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<style lang="scss" scoped>
.order-total-text,
.order-modal-text {
  font-size: 18px;
  line-height: 100%;
  font-weight: 600;
}

.order-modal {
  max-width: 400px;
}

.order-modal-close {
  min-width: 160px;
}
</style>
