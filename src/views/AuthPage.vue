<script setup>
  import {
    NForm,
    NFormItem,
    NInput,
    NFlex,
    NH1
  } from 'naive-ui'
</script>

<template>
  <n-flex align="center" justify="center" class="auth-page-body">
    <n-form class="auth-form">
      <n-h1 align-text="center">Форма авторизации</n-h1>
      <n-form-item label="Почта">
        <n-input placeholder="Введите почту" />
      </n-form-item>
      <n-form-item label="Пароль">
        <n-input placeholder="Введите пароль" type="password" />
      </n-form-item>
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
</style>
