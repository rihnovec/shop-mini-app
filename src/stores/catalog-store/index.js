import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCatalogStore = defineStore('catalogStore', () => {
  const items = ref([])
  const categories = ref([])
  const selectedCategory = ref({
    label: 'Все категории',
    value: 'all',
  })
  const catalogTitle = ref(selectedCategory.value.label)
  const priceRange = ref({
    min: 0,
    max: 0,
  })

  function fetchProducts(params = {}) {
    const endpoint =
      selectedCategory.value.value === 'all'
        ? 'https://fakestoreapi.com/products/'
        : `https://fakestoreapi.com/products/category/${selectedCategory.value.value}`

    return axios({
      url: endpoint,
      method: 'get',
      responseType: 'json',
    }).then(response => {
      if (response.status === 200) {
        if (params?.price) {
          items.value = response.data.filter(
            product =>
              product.price >= params.price.min &&
              product.price <= params.price.max,
          )
        } else {
          items.value = response.data
        }
      }
    })
  }

  function fetchCategories() {
    return axios({
      url: 'https://fakestoreapi.com/products/categories',
      method: 'get',
      responseType: 'json',
    }).then(response => {
      if (response.status === 200) {
        categories.value = response.data
      }
    })
  }

  async function resetFilter() {
    selectedCategory.value = {
      label: 'Все категории',
      value: 'all',
    }

    await fetchProducts()
    catalogTitle.value = selectedCategory.value.label
  }

  async function applyFilter(params = {}) {
    await fetchProducts(params)
    catalogTitle.value = selectedCategory.value.label
  }

  function setPriceRange({ min, max } = { min: 0, max: 0 }) {
    priceRange.value = { min, max }
  }

  return {
    items,
    categories,
    selectedCategory,
    catalogTitle,
    priceRange,
    fetchProducts,
    fetchCategories,
    resetFilter,
    applyFilter,
    setPriceRange,
  }
})
