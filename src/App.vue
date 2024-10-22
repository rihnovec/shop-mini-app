<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
import { NLayout } from 'naive-ui'
// import VHeader from '@/components/VHeader.vue'
// import VBody from '@/components/VBody.vue'
// import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    NLayout,
  },
  setup() {
    const appName: Ref<string> = ref('Shop Mini App')

    return { appName }
  },
})

// const router = useRouter()
</script>

<template>
  <n-layout>
    Test TS APP {{ appName }}
    <!-- <VHeader v-if="router.currentRoute.value.name !== 'auth'" /> -->
    <!-- <VBody /> -->
  </n-layout>
</template>

<style scoped></style>
