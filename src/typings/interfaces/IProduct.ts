import { TypeImageSrc } from '../types/TypeImageSrc'

export interface IProduct {
  id: number
  title: string
  price: number
  category?: string
  description?: string
  image: TypeImageSrc
}
