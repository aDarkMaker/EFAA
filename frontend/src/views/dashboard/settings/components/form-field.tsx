import { clsx } from 'clsx'
import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  children: ReactNode
  className?: string
  labelClassName?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  className,
  labelClassName,
}) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <label
        className={clsx('block mb-2 text-text-gray text-sm', labelClassName)}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
