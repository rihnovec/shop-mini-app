import {ref, computed} from 'vue'

export const useValidateInput = (validator) => {
  const isValid = ref(true)
  const validationStatus = computed(() => isValid.value ? 'success' : 'error')

  function onInput(value) {
    isValid.value = validator(value)
  }

  return {isValid, validationStatus, onInput}
}
