import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'type'> {
  icon?: string
  className?: string
  type?: InputHTMLAttributes<HTMLInputElement>['type']
}

export const TextInput: React.FC<TextInputProps> = ({
  icon,
  className,
  type = 'text',
  ...props
}) => {
  return (
    <div className={clsx('relative', className)}>
      {icon && (
        <i
          className={clsx(
            icon,
            'absolute left-4 top-1/2 -translate-y-1/2 text-text-gray',
          )}
        />
      )}
      <input
        type={type}
        className={clsx(
          'w-full bg-bg-main border border-border text-text-main',
          'px-4 py-3 rounded-lg text-base',
          'focus:border-accent transition-colors',
          icon && 'pl-12',
        )}
        {...props}
      />
    </div>
  )
}
