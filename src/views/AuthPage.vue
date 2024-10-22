<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../stores/main-store/index'
import { useAuth } from '../composables/auth'
import md5 from 'crypto-js/md5'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import {
  NForm,
  NFormItem,
  NInput,
  NFlex,
  NButton,
  NSpace,
  NH1,
  NModal,
  NResult,
  NCard,
} from 'naive-ui'

import { AppRoutes } from '../typings/enums/AppRoutes'
import { useUsers } from '../composables/users'
import { useAuthFormControls } from '../composables/auth-form-controls'

const { isAuthorized } = storeToRefs(useMainStore())
const authRejected: Ref<boolean> = ref(false)

const router: Router = useRouter()
const { redirectByAuthStatus } = useAuth()

const { users } = useUsers()
const { controls } = useAuthFormControls()

const formIsValid: Ref<boolean> = computed(
  () =>
    controls.every(control => control.isValid.value) &&
    controls.every(control => control.value.value.length > 0),
)

onBeforeMount(() => {
  redirectByAuthStatus()
})

function onSubmit(event: Event): void {
  const formData = new FormData(event.target)

  const login: string | null = formData.get('login')?.toString() || ''
  const password: string | null = formData.get('password')?.toString() || ''

  if (checkAuth(login, password)) {
    isAuthorized.value = true
    router.push({ name: AppRoutes.HOME })
  } else {
    authRejected.value = true
  }
}

function checkAuth(login: string, password: string): boolean {
  return !!users.value.find(
    user => user.login === login && user.password === md5(password).toString(),
  )
}
</script>

<template>
  <n-flex align="center" justify="center" class="auth-page-body">
    <n-form class="auth-form" @submit.prevent="onSubmit">
      <n-h1 class="auth-form-title">Форма авторизации</n-h1>
      <n-space vertical size="large">
        <n-form-item
          v-for="(
            {
              placeholder,
              label,
              type,
              name,
              value,
              validationStatus,
              feedback,
              showFeedback,
              onInput,
            },
            index
          ) in controls"
          :key="index"
          :label="label"
          class="auth-form-input"
          :feedback="feedback.value"
          :show-feedback="showFeedback.value"
        >
          <n-input
            :placeholder="placeholder"
            :input-props="{ name: name }"
            :type="type"
            :value="value.value"
            :status="validationStatus.value"
            :on-update:value="onInput"
          />
        </n-form-item>
        <n-flex justify="center">
          <n-button
            type="primary"
            attr-type="submit"
            class="auth-form-submit"
            :disabled="!formIsValid"
            >Войти</n-button
          >
        </n-flex>
      </n-space>
    </n-form>
  </n-flex>
  <n-modal v-model:show="authRejected">
    <n-card class="error-message-card">
      <n-result
        status="error"
        title="Ошибка"
        description="Неверный логин или пароль"
      >
        <template #footer>
          <n-button @click="authRejected = false">Закрыть</n-button>
        </template>
      </n-result>
    </n-card>
  </n-modal>
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

.error-message-card {
  max-width: 400px;
}

@media screen and (min-width: 768px) {
  .auth-form {
    padding: 24px;
    min-width: 364px;
    max-width: 500px;
  }
}
</style>
