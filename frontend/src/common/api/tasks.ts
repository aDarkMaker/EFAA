import { requestDefault } from '@/common/request'

export interface TaskConfig {
  [taskId: string]: {
    name: string
    default: boolean
  }
}

export interface GetTasksResponse {
  retcode: number
  data: TaskConfig
}

export interface ToggleTaskParams {
  task_id: string
  enabled: boolean
}

export interface ToggleTaskResponse {
  retcode: number
  data: {
    status: string
    task: string
    enabled: boolean
  }
}

export const getTasks = async (): Promise<TaskConfig> => {
  const request = await requestDefault()
  const response = await request.get<GetTasksResponse>('/api/tasks')
  return response.data.data
}

export const toggleTask = async (taskId: string, enabled: boolean): Promise<ToggleTaskResponse['data']> => {
  const request = await requestDefault()
  const response = await request.post<ToggleTaskResponse>(
    `/api/tasks/toggle?task_id=${encodeURIComponent(taskId)}&enabled=${enabled}`,
  )
  return response.data.data
}
