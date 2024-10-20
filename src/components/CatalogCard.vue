<script setup>
import {computed} from 'vue'
import {useCartStore} from '@/stores/cart-store/index.js'

import {
  NButton,
  NCard,
  NEl
} from 'naive-ui'

const props = defineProps({
  id: Number,
  title: String,
  image: String,
  price: Number
})

defineOptions({
  inheritAttrs: false
})

const cartStore = useCartStore()
const {inCart, addToCart, removeFromCart} = cartStore

const isAddedToCart = computed(() => inCart(props.id))

const addToCartText = computed(() => {
  return isAddedToCart.value ? 'Убрать из корзины' : 'В корзину'
})

function onCartButtonClick() {
  if (isAddedToCart.value) {
    removeFromCart(props.id)
  } else {
    addToCart({
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price,
      quantity: 1
    })
  }
}
</script>

<template>
  <n-card :title="title" class="catalog-card" header-class="catalog-card-head">
    <template #cover>
      <img :src="image" :alt="title" class="catalog-card-image">
    </template>
    <template #footer>
      <n-el class="catalog-card-price">${{price}}</n-el>
    </template>
    <template #action>
      <n-button type="primary"
                attr-type="button"
                @click="onCartButtonClick" :ghost="isAddedToCart">{{addToCartText}}</n-button>
    </template>
  </n-card>
</template>

<style lang="scss" scoped>
.catalog-card {
  height: 100%;
}

.catalog-card-image {
  max-height: 200px;
  object-fit: contain;
}

.catalog-card-price {
  font-size: 16px;
  line-height: 100%;
  font-weight: 600;
}
</style>

<style lang="scss">
.catalog-card-head {
  min-height: 0;
  flex-grow: 1;
}
</style>
