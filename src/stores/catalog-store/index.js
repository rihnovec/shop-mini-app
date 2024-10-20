import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import axios from 'axios'

export const useCatalogStore = defineStore('catalogStore', () => {
  const items = ref([])
  const categories = ref([])
  const selectedCategoryValue = ref('all')
  const selectedCategoryTitle = ref('Все категории')
  const priceRange = ref({
    min: 0,
    max: 0
  })

  function fetchProducts() {
    const endpoint = selectedCategoryValue.value === 'all'
      ? 'https://fakestoreapi.com/products/'
      : `https://fakestoreapi.com/products/category/${selectedCategoryValue.value}`

    return axios({
      url: endpoint,
      method: 'get',
      responseType: 'json'
    }).then(response => {
      if (response.status === 200) {
        items.value = response.data
      }
    })
  }

  function fetchCategories() {
    return axios({
      url: 'https://fakestoreapi.com/products/categories',
      method: 'get',
      responseType: 'json'
    }).then(response => {
      if (response.status === 200) {
        categories.value = response.data
      }
    })
  }

  function resetFilter() {
    selectedCategoryValue.value = 'all'
    selectedCategoryTitle.value = 'Все категории'
    fetchProducts()
  }

  function applyFilter() {
    fetchProducts()
  }

  function setPriceRange({min, max} = {min: 0, max: 0}) {
    priceRange.value = {min, max}
  }

  return {
    items,
    categories,
    selectedCategoryTitle,
    selectedCategoryValue,
    priceRange,
    fetchProducts,
    fetchCategories,
    resetFilter,
    applyFilter,
    setPriceRange
  }
})
