import { clsx } from 'clsx'

interface NewsCardProps {
  image: string
  badge?: string
  badgeType?: 'default' | 'video'
  title: string
  source: string
  sourceAvatar?: string
  sourceInitial?: string
  timeAgo: string
  likes?: number
  comments?: number
  colSpan?: number
  onPlay?: () => void
}

export const NewsCard: React.FC<NewsCardProps> = ({
  image,
  badge,
  badgeType = 'default',
  title,
  source,
  sourceAvatar,
  sourceInitial,
  timeAgo,
  likes,
  comments,
  colSpan = 1,
  onPlay,
}) => {
  const isLarge = colSpan > 1

  return (
    <div
      className={clsx(
        'bg-bg-card border border-border rounded-2xl overflow-hidden',
        'flex flex-col transition-all',
        'hover:-translate-y-1 hover:shadow-lg hover:border-accent/30',
        colSpan === 2 && 'lg:col-span-2',
        colSpan === 3 && 'lg:col-span-2 2xl:col-span-3',
      )}
    >
      {/* Image Section */}
      <div className={clsx('relative overflow-hidden bg-bg-sidebar', isLarge ? 'h-80' : 'h-64')}>
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover transition-transform duration-500 hover:scale-105 opacity-80'
        />

        {/* Badge */}
        {badge && (
          <div
            className={clsx(
              'absolute top-4 left-4 px-3 py-1 rounded-full text-xs backdrop-blur-sm',
              'flex items-center gap-1 z-10',
              badgeType === 'video'
                ? 'bg-accent text-text-reverse font-bold'
                : 'bg-black/70 text-text-main',
            )}
          >
            {badgeType === 'video' && <i className='ri-play-fill' />}
            {badge}
          </div>
        )}

        {/* Play Icon for Video */}
        {badgeType === 'video' && (
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer'
            onClick={onPlay}
          >
            <div className='w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center'>
              <i className='ri-play-fill text-text-main text-2xl ml-1' />
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='flex-1 flex flex-col p-6'>
        <h3
          className={clsx(
            'font-bold text-text-main mb-4 line-clamp-2',
            isLarge ? 'text-2xl' : 'text-xl',
          )}
        >
          {title}
        </h3>

        {/* Meta Info */}
        <div className='mt-auto pt-4 border-t border-border flex items-center justify-between'>
          <div className='flex items-center gap-2 text-text-gray text-sm'>
            <div className='w-6 h-6 rounded-full bg-bg-sidebar flex items-center justify-center overflow-hidden flex-shrink-0'>
              {sourceAvatar
                ? (
                  <img src={sourceAvatar} alt={source} className='w-full h-full object-cover' />
                  )
                : (
                  <span className='text-xs'>{sourceInitial || source[0]}</span>
                  )}
            </div>
            <span className='text-text-main'>{source}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>

          <div className='flex items-center gap-4 text-text-gray text-sm'>
            {likes !== undefined && (
              <div className='flex items-center gap-1'>
                <i className='ri-thumb-up-line hover:text-accent transition-colors cursor-pointer' />
                <span>{likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}</span>
              </div>
            )}
            {comments !== undefined && (
              <div className='flex items-center gap-1'>
                <i className='ri-message-3-line hover:text-accent transition-colors cursor-pointer' />
                {comments > 0 && <span>{comments}</span>}
              </div>
            )}
            <i className='ri-share-forward-line hover:text-accent transition-colors cursor-pointer' />
          </div>
        </div>
      </div>
    </div>
  )
}
