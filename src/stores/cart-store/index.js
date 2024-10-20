import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useCartStore = defineStore('cartStore', () => {
  const items = ref([])
  const quantity = computed(() => items.value.length)

  function inCart(productId) {
    return !!items.value.find(product => product.id === productId)
  }

  function addToCart(product) {
    items.value.push(product)
  }

  function removeFromCart(productId) {
    items.value = items.value.filter(product => product.id !== productId)
  }

  function clearCart() {
    items.value = []
  }

  function changeQuantity({productId, quantity}) {
    const product = items.value.find(product => product.id === productId)

    if (product) {
      product.quantity = quantity
    }
  }

  return {items, quantity, inCart, addToCart, removeFromCart, clearCart, changeQuantity}
})
