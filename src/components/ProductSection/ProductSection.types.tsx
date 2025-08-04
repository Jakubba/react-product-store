import type { Product } from '../../services/productStore.types'

export interface ProductSectionProps {
  title: string
  products: Product[]
  loading: boolean
  showMore?: boolean
  pageSize?: number
  lastProductRef?: React.Ref<HTMLDivElement>
}
