import { clsx } from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

interface SecondaryButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  className,
  size = 'md',
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }

  return (
    <button
      className={clsx(
        'bg-transparent text-accent border border-accent',
        'rounded-lg font-medium',
        'cursor-pointer transition-all whitespace-nowrap',
        'hover:bg-accent/10 sm:flex-shrink-0',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
