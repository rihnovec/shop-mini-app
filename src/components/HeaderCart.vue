<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart-store/index.ts'

import { NBadge, NIcon } from 'naive-ui'

const { quantity } = storeToRefs(useCartStore())
</script>

<template>
  <RouterLink to="/order">
    <n-badge :value="quantity">
      <n-icon size="30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6.3 5H21l-2 7H7.377M20 16H8L6 3H3m6 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm11 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          />
        </svg>
      </n-icon>
    </n-badge>
  </RouterLink>
</template>

<style scoped></style>
