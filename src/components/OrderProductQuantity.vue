<script setup>
import {useCartStore} from '@/stores/cart-store/index.js'

import {
  NButton,
  NButtonGroup,
  NEl
} from 'naive-ui'

const props = defineProps({
  id: Number,
  quantity: Number
})

defineOptions({
  inheritAttrs: false
})

const {changeQuantity, removeFromCart} = useCartStore()

function onIncrementClick() {
  changeQuantity({
    productId: props.id,
    quantity: props.quantity + 1,
  })
}

function onDecrementClick() {
  if (props.quantity <= 1) {
    removeFromCart(props.id)
  } else {
    changeQuantity({
      productId: props.id,
      quantity: props.quantity - 1,
    })
  }
}
</script>

<template>
  <div class="order-product-quantity">
    <n-button-group>
      <n-button ghost round attr-type="button" @click="onDecrementClick">-</n-button>
      <n-el class="order-product-quantity-value">{{quantity}}</n-el>
      <n-button ghost round attr-type="button" @click="onIncrementClick">+</n-button>
    </n-button-group>
  </div>
</template>

<style lang="scss" scoped>
.order-product-quantity-value {
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgb(224, 224, 230);
  border-bottom: 1px solid rgb(224, 224, 230);
  width: 50px;
}
</style>
