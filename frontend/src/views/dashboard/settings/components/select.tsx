import { clsx } from 'clsx'
import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  className?: string
  options: Array<{ value: string; label: string }>
}

export const Select: React.FC<SelectProps> = ({
  className,
  options,
  ...props
}) => {
  return (
    <div className={clsx('relative', className)}>
      <select
        className={clsx(
          'w-full bg-bg-main border border-border text-text-main',
          'px-4 py-3 rounded-lg appearance-none cursor-pointer',
          'text-base focus:border-accent transition-colors',
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <i className='ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-accent pointer-events-none' />
    </div>
  )
}
