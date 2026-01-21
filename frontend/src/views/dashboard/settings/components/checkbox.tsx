import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  label?: string
  description?: string
  className?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  className,
  checked,
  ...props
}) => {
  return (
    <label
      className={clsx(
        'flex items-start cursor-pointer select-none',
        className,
      )}
    >
      <input type='checkbox' className='hidden' checked={checked} {...props} />
      <div
        className={clsx(
          'w-6 h-6 border-2 rounded-md mr-3 mt-0.5',
          'flex items-center justify-center transition-all',
          checked ? 'bg-accent border-accent' : 'border-border',
        )}
      >
        {checked && (
          <i className='ri-check-line text-text-reverse text-base font-bold' />
        )}
      </div>
      {(label || description) && (
        <div className='flex-1'>
          {label && <div className='text-text-main text-base'>{label}</div>}
          {description && (
            <div className='text-text-gray text-xs mt-1'>{description}</div>
          )}
        </div>
      )}
    </label>
  )
}
