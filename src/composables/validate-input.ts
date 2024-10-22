import { ref, computed } from 'vue'

export const useValidateInput = validator => {
  const isValid = ref(true)
  const value = ref('')
  const validationStatus = computed(() => (isValid.value ? 'success' : 'error'))

  function onInput(inputValue) {
    isValid.value = validator(inputValue)
    value.value = inputValue
  }

  return { isValid, value, validationStatus, onInput }
}
