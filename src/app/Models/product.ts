export interface IProduct {
  id?: number,
  description: string,
  category_id: number,
  provider_id: number,
  provider_name?: string,
  category?: string,
  price: number,
  stock_quantity: number
}
