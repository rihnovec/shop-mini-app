<script setup>
import {onBeforeMount} from 'vue'
import {storeToRefs} from 'pinia'
import {useMainStore} from '@/stores/main-store/index'
import {useAuth} from '@/composables/auth.js'

import {
  NForm,
  NFormItem,
  NInput,
  NFlex,
  NButton,
  NH1
} from 'naive-ui'

const {isAuthorized} = storeToRefs(useMainStore())

const {redirectByAuthStatus} = useAuth()

onBeforeMount(() => {
  redirectByAuthStatus()
})

function onSubmit() {
  isAuthorized.value = true
}
</script>

<template>
  <n-flex align="center" justify="center" class="auth-page-body">
    <n-form class="auth-form" @submit="onSubmit">
      <n-h1 class="auth-form-title">Форма авторизации</n-h1>
      <n-form-item label="Почта">
        <n-input placeholder="Введите почту" />
      </n-form-item>
      <n-form-item label="Пароль">
        <n-input placeholder="Введите пароль" type="password" />
      </n-form-item>
      <n-flex justify="center">
        <n-button type="primary" attr-type="submit" class="auth-form-submit">Войти</n-button>
      </n-flex>
    </n-form>
  </n-flex>
</template>

<style lang="scss" scoped>
  .auth-page-body {
    height: 100vh;
  }

  .auth-form {
    padding: 24px;
    border-radius: 3px;
    border: 1px solid rgb(224, 224, 230);
  }

  .auth-form-title {
    text-align: center;
  }

  .auth-form-submit {
    min-width: 160px;
  }
</style>
