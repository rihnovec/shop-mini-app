import { defineStore } from 'pinia'

import { ICartState } from '../../typings/interfaces/ICartState'
import { ICartProduct } from '../../typings/interfaces/ICartProduct'

export const useCartStore = defineStore('cartStore', {
  state: (): ICartState => {
    return {
      items: [],
    }
  },
  getters: {
    quantity(state: ICartState): number {
      return state.items.length
    },
  },
  actions: {
    inCart(productId: number): boolean {
      return !!this.items.find(product => product.id === productId)
    },
    addToCart(product: ICartProduct): void {
      this.items.push(product)
    },
    removeFromCart(productId: number): boolean {
      const targetProduct: ICartProduct | undefined = this.items.find(
        product => product.id === productId,
      )

      this.items.filter(product => product.id !== productId)

      return targetProduct !== undefined
    },
    clearCart(): void {
      this.items = []
    },
    changeQuantity(productId: number, quantity: number): boolean {
      const product: ICartProduct | undefined = this.items.find(
        product => product.id === productId,
      )

      if (product) {
        product.quantity = quantity
        return true
      } else {
        return false
      }
    },
  },
})
