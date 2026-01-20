import clsx from 'clsx'

interface TaskItemProps {
  id?: string
  name: string
  description: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  description,
  checked = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <div
      className={clsx(
        'bg-bg-card border border-border rounded-xl px-6 py-4 flex items-center justify-between',
        'transition-all',
      )}
    >
      <div className='flex items-center gap-4'>
        <label className='relative w-7 h-7 cursor-pointer'>
          <input
            type='checkbox'
            className='opacity-0 absolute w-0 h-0'
            checked={checked}
            onChange={handleChange}
            id={id}
          />
          <span
            className={clsx(
              'absolute top-0 left-0 w-7 h-7 border-2 border-accent rounded-md',
              'transition-all flex items-center justify-center',
              checked && 'bg-accent',
            )}
          >
            {checked && (
              <i className='ri-check-line text-xl text-text-reverse font-semibold' />
            )}
          </span>
        </label>
        <div className='flex flex-col gap-0.5'>
          <span
            className='text-xl text-text-main font-bold'
            style={{ fontFamily: "'MiSans-Bold', sans-serif" }}
          >
            {name}
          </span>
          <span className='text-sm text-text-gray'>{description}</span>
        </div>
      </div>
    </div>
  )
}
