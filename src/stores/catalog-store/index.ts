import { defineStore } from 'pinia'
import axios from 'axios'
import { ICatalogState } from '../../typings/interfaces/ICatalogState'
import { IFilterParams } from '../../typings/interfaces/IFilterParams'
import { IProduct } from '../../typings/interfaces/IProduct'
import { TypeCategoryName } from '../../typings/types/TypeCategoryName'
import { TypeRange } from '../../typings/types/TypeRange'

export const useCatalogStore = defineStore('catalogStore', {
  state: (): ICatalogState => {
    return {
      items: [],
      categories: [],
      selectedCategory: {
        label: 'Все категории',
        value: 'all',
      },
      catalogTitle: 'Все категории',
      priceRange: {
        min: 0,
        max: 0,
      },
    }
  },
  actions: {
    async fetchProducts(params?: IFilterParams): Promise<IProduct[] | void> {
      const endpoint: string =
        this.selectedCategory.value === 'all'
          ? 'https://fakestoreapi.com/products/'
          : `https://fakestoreapi.com/products/category/${this.selectedCategory.value}`

      return axios({
        url: endpoint,
        method: 'get',
        responseType: 'json',
      }).then(response => {
        if (response.status === 200) {
          if (params?.price) {
            this.items = response.data.filter(
              (product: IProduct) =>
                product.price >= params.price.min &&
                product.price <= params.price.max,
            )
          } else {
            this.items = response.data
          }
        }
      })
    },
    async fetchCategories(): Promise<TypeCategoryName[] | void> {
      return axios({
        url: 'https://fakestoreapi.com/products/categories',
        method: 'get',
        responseType: 'json',
      }).then(response => {
        if (response.status === 200) {
          this.categories = response.data
        }
      })
    },
    async resetFilter(): Promise<void> {
      this.selectedCategory = {
        label: 'Все категории',
        value: 'all',
      }

      await this.fetchProducts()

      this.priceRange = {
        min: Math.min(...this.items.map(product => product.price)),
        max: Math.max(...this.items.map(product => product.price)),
      }

      this.catalogTitle = this.selectedCategory.label
    },
    async applyFilter(params?: IFilterParams): Promise<void> {
      await this.fetchProducts(params)
      this.catalogTitle = this.selectedCategory.label
    },
    setPriceRange({ min, max }: TypeRange): void {
      this.priceRange = { min, max }
    },
  },
})
