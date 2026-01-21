import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'

interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  className?: string
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={clsx('flex flex-col sm:flex-row gap-4', className)}>
      <input
        type={showPassword ? 'text' : 'password'}
        className={clsx(
          'flex-1 bg-bg-main border border-border text-text-main',
          'px-4 py-3 rounded-lg text-base',
          'focus:border-accent transition-colors',
        )}
        {...props}
      />
      <button
        type='button'
        className={clsx(
          'bg-transparent text-accent border border-accent',
          'px-4 py-3 rounded-lg font-medium text-sm',
          'cursor-pointer transition-all whitespace-nowrap',
          'hover:bg-accent/10 sm:flex-shrink-0',
        )}
        onClick={() => setShowPassword(!showPassword)}
      >
        <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
      </button>
    </div>
  )
}
