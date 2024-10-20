<script setup>
import {computed, onBeforeMount, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useMainStore} from '@/stores/main-store/index'
import {useAuth} from '@/composables/auth.js'
import {useValidateInput} from '@/composables/validate-input.js'
import md5 from 'crypto-js/md5.js'

import {
  NForm,
  NFormItem,
  NInput,
  NFlex,
  NButton,
  NSpace,
  NH1
} from 'naive-ui'

const {isAuthorized} = storeToRefs(useMainStore())

const {redirectByAuthStatus} = useAuth()

debugger

const users = ref([
  {
    login: 'frontend@dev.ru',
    password: 'abe45d28281cfa2a4201c9b90a143095' // 123test
  }
])

const controls = [
  {
    placeholder: 'Введите почту',
    label: 'Почта',
    type: 'text',
    errorMessage: 'Введенное значение не является e-mail',
    validator: value => /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)
  },
  {
    placeholder: 'Введите пароль',
    label: 'Пароль',
    type: 'password',
    errorMessage: 'Длина пароля должна быть не мнее 6 символов',
    validator: value => value.length >= 6
  },
].map(control => {
  const {isValid, validationStatus, onInput} = useValidateInput(control.validator)
  const feedback = computed(() => isValid.value ? '' : control.errorMessage)
  const showFeedback = computed(() => !isValid.value)

  return {
    ...control,
    validationStatus,
    feedback,
    showFeedback,
    onInput
  }
})

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
      <n-space vertical size="large">
        <n-form-item v-for="({placeholder, label, type, validationStatus, feedback, showFeedback, onInput}, index) in controls"
                     :key="index"
                     :label="label"
                     class="auth-form-input"
                     :feedback="feedback.value" :show-feedback="showFeedback.value">
          <n-input :placeholder="placeholder" :type="type" :status="validationStatus.value" :on-update:value="onInput"/>
        </n-form-item>
        <n-flex justify="center">
          <n-button type="primary" attr-type="submit" class="auth-form-submit">Войти</n-button>
        </n-flex>
      </n-space>
    </n-form>
  </n-flex>
</template>

<style lang="scss" scoped>
.auth-page-body {
  height: 100vh;
}

.auth-form {
  max-width: calc(100vw - 24px * 2);
  padding: 24px 14px;
  border-radius: 3px;
  border: 1px solid rgb(224, 224, 230);
}

.auth-form-title {
  text-align: center;
}

.auth-form-submit {
  min-width: 160px;
}

@media screen and (min-width: 768px) {
  .auth-form {
    padding: 24px;
    min-width: 364px;
    max-width: 500px;
  }
}
</style>
