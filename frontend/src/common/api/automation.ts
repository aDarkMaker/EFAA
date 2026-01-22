import { requestDefault } from '@/common/request'

export interface ExecuteResponse {
  status: string
  message: string
}

export const execute = async (): Promise<ExecuteResponse> => {
  const request = requestDefault()
  const response = await request.post<ExecuteResponse>('/api/execute')
  return response.data
}
