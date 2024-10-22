import { ref, computed } from 'vue'
import type { Ref } from 'vue'

type TypeValidatorFunction = (a: string) => boolean
type TypeValidationStatus = 'success' | 'error'

export const useValidateInput = (validator: TypeValidatorFunction) => {
  const isValid: Ref<boolean> = ref(true)
  const value: Ref<string> = ref('')
  const validationStatus: Ref<TypeValidationStatus> = computed(() =>
    isValid.value ? 'success' : 'error',
  )

  function onInput(inputValue: string) {
    isValid.value = validator(inputValue)
    value.value = inputValue
  }

  return { isValid, value, validationStatus, onInput }
}
