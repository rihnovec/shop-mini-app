<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuth } from '../composables/auth'
import { useCartStore } from '../stores/cart-store/index'

import { NLayout, NLayoutContent } from 'naive-ui'
import Order from '../components/Order.vue'
import OrderEmpty from '../components/OrderEmpty.vue'

const { redirectByAuthStatus } = useAuth()
redirectByAuthStatus()

const cartStore = useCartStore()
const { quantity } = storeToRefs(cartStore)
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
      <Order v-if="quantity > 0" />
      <OrderEmpty v-else />
    </n-layout-content>
  </n-layout>
</template>

<style scoped></style>
