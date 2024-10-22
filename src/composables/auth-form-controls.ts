import type { Ref } from 'vue'
import { computed } from 'vue'
import { useValidateInput } from './validate-input'
import { IFormControl } from '../typings/interfaces/IFormControl.js'

export const useAuthFormControls = () => ({
  controls: [
    {
      placeholder: 'Введите почту',
      label: 'Почта',
      type: 'text',
      name: 'login',
      errorMessage: 'Введенное значение не является e-mail',
      validator: (value: string): boolean =>
        /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          value,
        ),
    },
    {
      placeholder: 'Введите пароль',
      label: 'Пароль',
      type: 'password',
      name: 'password',
      errorMessage: 'Длина пароля должна быть не мнее 6 символов',
      validator: (value: string): boolean => value.length >= 6,
    },
  ].map(control => {
    const { isValid, value, validationStatus, onInput } = useValidateInput(
      control.validator,
    )
    const feedback: Ref<string> = computed(() =>
      isValid.value ? '' : control.errorMessage,
    )
    const showFeedback: Ref<boolean> = computed(() => !isValid.value)

    return {
      ...control,
      isValid,
      value,
      validationStatus,
      feedback,
      showFeedback,
      onInput,
    }
  }) as IFormControl[],
})
