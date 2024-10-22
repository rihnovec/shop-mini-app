import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { TypeValidatorFunction } from '../typings/types/TypeValidatorFunction'
import { TypeValidationStatus } from '../typings/types/TypeValidationStatus'

export const useValidateInput = (validator: TypeValidatorFunction) => {
  const isValid: Ref<boolean> = ref(true)
  const value: Ref<string> = ref('')
  const validationStatus: Ref<TypeValidationStatus> = computed(() =>
    isValid.value ? 'success' : 'error',
  )

  function onInput(inputValue: string): void {
    isValid.value = validator(inputValue)
    value.value = inputValue
  }

  return { isValid, value, validationStatus, onInput }
}
