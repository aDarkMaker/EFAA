import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  icon?: string
  className?: string
  children: ReactNode
  rightAction?: ReactNode
}

export const Card: React.FC<CardProps> = ({
  title,
  icon,
  className,
  children,
  rightAction,
}) => {
  return (
    <div
      className={clsx(
        'bg-bg-card border border-border rounded-2xl p-8',
        'transition-all hover:shadow-lg hover:border-accent/30',
        className,
      )}
    >
      {(title || rightAction) && (
        <div className={clsx('flex items-center mb-6', rightAction && 'justify-between')}>
          {(title || icon) && (
            <div className='flex items-center gap-2'>
              {icon && <i className={clsx(icon, 'text-accent text-xl')} />}
              {title && <h3 className='text-xl font-bold text-text-main'>{title}</h3>}
            </div>
          )}
          {rightAction && <div>{rightAction}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
