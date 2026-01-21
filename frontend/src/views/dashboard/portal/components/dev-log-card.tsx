import { clsx } from 'clsx'

interface DevLogCardProps {
  version: string
  date: string
  title: string
  description: string
  tags: string[]
  onReadMore?: () => void
}

export const DevLogCard: React.FC<DevLogCardProps> = ({
  version,
  date,
  title,
  description,
  tags,
  onReadMore,
}) => {
  return (
    <div
      className={clsx(
        'bg-bg-card border border-border rounded-2xl p-4',
        'flex flex-col',
        'transition-all hover:-translate-y-1 hover:border-accent',
        'hover:shadow-lg relative overflow-hidden',
      )}
    >
      {/* Top accent line */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/50 to-transparent' />

      <div className='flex justify-between items-center mb-3'>
        <span
          className={clsx(
            'bg-bg-sidebar text-accent px-3 py-1.5 rounded-md',
            'text-sm font-bold border border-accent/30',
          )}
        >
          {version}
        </span>
        <span className='text-text-gray text-sm font-medium'>{date}</span>
      </div>

      <div className='flex-1 flex flex-col'>
        <h3 className='text-xl font-bold text-text-main mb-2 leading-tight'>
          {title}
        </h3>
        <p className='text-base text-text-gray leading-relaxed flex-1'>
          {description}
        </p>
      </div>

      <div className='flex items-center justify-between mt-auto'>
        <div className='flex gap-2'>
          {tags.map((tag, index) => (
            <span
              key={index}
              className='text-xs text-text-gray bg-bg-sidebar px-2 py-1 rounded'
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          onClick={onReadMore}
          className='text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all'
        >
          查看详情
          <i className='ri-arrow-right-line' />
        </button>
      </div>
    </div>
  )
}
