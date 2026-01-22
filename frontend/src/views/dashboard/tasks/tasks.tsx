import { useEffect, useState } from 'react'

import { useApi } from '@/common/api'
import type { TaskConfig } from '@/common/api/tasks'
import { toggleTask } from '@/common/api/tasks'
import { Header } from '@/views/dashboard/components/header'
import { ActionButton } from '@/views/dashboard/tasks/components/action-button'
import type { Task } from '@/views/dashboard/tasks/components/task-list'
import { TaskList } from '@/views/dashboard/tasks/components/task-list'
import { Terminal } from '@/views/dashboard/tasks/components/terminal'

// 将 API 返回的 TaskConfig 转换为 Task[]
const convertTaskConfigToTasks = (taskConfig: TaskConfig): Task[] => {
  return Object.entries(taskConfig).map(([taskId, config]) => ({
    id: taskId,
    name: config.name,
    description: '',
    checked: config.default,
  }))
}

export const Tasks: React.FC = () => {
  const [taskConfig, error, refreshTasks] = useApi('getTasks', [])
  const [shouldExecute, setShouldExecute] = useState<boolean>(false)
  const [executeResult, executeError] = useApi('execute', shouldExecute && [])
  const [logs, setLogs] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)

  const tasks: Task[] = taskConfig ? convertTaskConfigToTasks(taskConfig) : []

  const handleTaskChange = async (taskId: string, checked: boolean) => {
    try {
      await toggleTask(taskId, checked)
      refreshTasks()
    } catch (err) {
      console.error('Failed to toggle task:', err)
    }
  }

  const handleExecute = () => {
    setIsExecuting(true)
    setLogs((prev) => [...prev, '开始执行任务...'])
    setShouldExecute(true)
  }

  // 监听执行结果
  useEffect(() => {
    if (executeResult) {
      setLogs((prev) => [
        ...prev,
        `执行完成: ${executeResult.message || executeResult.status}`,
      ])
      setIsExecuting(false)
      setShouldExecute(false)
    }
    if (executeError) {
      const errorMessage = executeError instanceof Error ? executeError.message : '执行任务失败'
      setLogs((prev) => [...prev, `错误: ${errorMessage}`])
      setIsExecuting(false)
      setShouldExecute(false)
    }
  }, [executeResult, executeError])

  return (
    <div className='flex flex-col gap-5'>
      <Header
        title='每日代理系统'
        subtitle='欢迎建设塔卫二，管理员'
        rightAction={
          <ActionButton
            label={isExecuting ? '执行中...' : '任务执行'}
            onClick={handleExecute}
            disabled={isExecuting}
          />
        }
      />

      <div className='flex gap-5'>
        <div className='flex-1 flex flex-col min-w-72'>
          <div className='text-text-gray text-sm mb-2 px-1'>Terminal</div>
          <Terminal logs={logs} />
        </div>
        <div className='flex-1 flex flex-col min-w-80'>
          <div className='text-text-gray text-sm mb-2 px-1'>Tasks</div>
          <div className='flex-1 overflow-y-auto'>
            {error
              ? (
                <div className='text-red-500 text-sm p-4'>
                  加载任务失败，请稍后重试
                </div>
                )
              : taskConfig === undefined
                ? <div className='text-text-gray text-sm p-4'>加载中...</div>
                : <TaskList tasks={tasks} onTaskChange={handleTaskChange} />}
          </div>
        </div>
      </div>
    </div>
  )
}
