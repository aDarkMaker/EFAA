interface SectionHeaderProps {
  title: string
  rightContent?: React.ReactNode
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  rightContent,
}) => {
  return (
    <div className='flex items-center justify-between mb-2.5'>
      <h2
        className='text-2xl text-text-main font-bold flex items-center gap-3'
      >
        <span className='block w-1.5 h-6 bg-accent rounded-sm' />
        {title}
      </h2>
      {rightContent && (
        <div className='flex items-center gap-2.5 text-text-gray'>
          {rightContent}
        </div>
      )}
    </div>
  )
}
