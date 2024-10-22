<script lang="ts">
import { defineComponent } from 'vue'

import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'

import { NLayout } from 'naive-ui'
import VHeader from './components/VHeader.vue'
import VBody from './components/VBody.vue'

export default defineComponent({
  name: 'App',
  components: {
    NLayout,
    VHeader,
    VBody,
  },
  setup() {
    const router: Router = useRouter()

    return { router }
  },
})
</script>

<template>
  <n-layout>
    <VHeader v-if="router.currentRoute.value.name !== 'auth'" />
    <VBody />
  </n-layout>
</template>

<style scoped></style>
