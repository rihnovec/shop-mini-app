import type { Ref } from 'vue'
import { TypeValidatorFunction } from '../types/TypeValidatorFunction'
import { TypeValidationStatus } from '../types/TypeValidationStatus'

export interface IFormControl {
  placeholder: string
  label: string
  type: string
  name: string
  errorMessage: string
  validator: TypeValidatorFunction
  isValid: Ref<boolean>
  value: Ref<string>
  validationStatus: Ref<TypeValidationStatus>
  feedback: Ref<string>
  showFeedback: Ref<boolean>
  onInput: (value: string) => void
}
