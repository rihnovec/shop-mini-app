import { VNode } from 'vue'
import { IOrderProduct } from './IOrderProduct'
import { IOrderProductQuantity } from './IOrderProductQuantity'

export interface IOrderTabletColumn {
  title: string
  key: string
  render?: (row: IOrderProduct | IOrderProductQuantity) => VNode
}
