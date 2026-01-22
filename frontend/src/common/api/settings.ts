import { requestDefault } from '@/common/request'

export interface TargetItem {
  name: string
  ocr_text: string
}

export interface PriorityItemsStrategy {
  selected_item: string
  description: string
  target_items: TargetItem[]
}

export interface LowestPriceStrategy {
  description: string
}

export interface ShoppingStrategy {
  selected_strategy: 'priority_items' | 'lowest_price'
  strategies: {
    priority_items: PriorityItemsStrategy
    lowest_price: LowestPriceStrategy
  }
  is_refresh: boolean
}

export interface GetShoppingSettingsResponse {
  retcode: number
  data: ShoppingStrategy
}

export interface UpdateShoppingSettingsParams {
  selected_strategy: 'priority_items' | 'lowest_price'
  strategies: {
    priority_items: PriorityItemsStrategy
    lowest_price: LowestPriceStrategy
  }
  is_refresh: boolean
}

export interface UpdateShoppingSettingsResponse {
  status: string
}

export const getShoppingSettings = async (): Promise<ShoppingStrategy> => {
  const request = await requestDefault()
  const response = await request.get<GetShoppingSettingsResponse>('/api/settings/shopping')
  return response.data.data
}

export const updateShoppingSettings = async (newData: UpdateShoppingSettingsParams): Promise<UpdateShoppingSettingsResponse> => {
  const request = await requestDefault()
  const response = await request.post<UpdateShoppingSettingsResponse>('/api/settings/shopping/update', newData)
  return response.data
}
