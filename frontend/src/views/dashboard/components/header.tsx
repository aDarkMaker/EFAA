interface HeaderProps {
  title: string
  subtitle?: string
  rightAction?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightAction,
}) => {
  return (
    <header className='flex justify-between items-end pb-8'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-5xl text-text-main mb-2'>
          {title}
        </h1>
        {subtitle && (
          <p className='text-lg text-text-gray'>{subtitle}</p>
        )}
      </div>
      {rightAction && (
        <div>{rightAction}</div>
      )}
    </header>
  )
}
