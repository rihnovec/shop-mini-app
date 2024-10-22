import { IProduct } from './IProduct'
import { TypeCategoryName } from '../types/TypeCategoryName'
import { IProductCategory } from './IProductCategory'
import { TypeRange } from '../types/TypeRange'

export interface ICatalogState {
  items: IProduct[]
  categories: TypeCategoryName[]
  selectedCategory: IProductCategory
  catalogTitle: string
  priceRange: TypeRange
  inProcess: boolean
}
