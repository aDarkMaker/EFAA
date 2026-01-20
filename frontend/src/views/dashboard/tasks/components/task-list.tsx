import { TaskItem } from './task-item'

export interface Task {
  id: string
  name: string
  description: string
  checked?: boolean
}

interface TaskListProps {
  tasks: Task[]
  onTaskChange?: (taskId: string, checked: boolean) => void
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
          checked={task.checked}
          onChange={(checked) => onTaskChange?.(task.id, checked)}
        />
      ))}
    </div>
  )
}
