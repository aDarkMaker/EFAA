interface DocMetaProps {
  lastUpdated?: string
  readTime?: string
  version?: string
}

export const DocMeta: React.FC<DocMetaProps> = ({
  lastUpdated,
  readTime,
  version,
}) => {
  return (
    <div className='flex gap-5 mb-8 text-sm text-text-gray'>
      {lastUpdated && <span>最后更新: {lastUpdated}</span>}
      {readTime && <span>阅读时间: {readTime}</span>}
      {version && (
        <span className='bg-accent/10 text-accent px-2.5 py-0.5 rounded text-xs font-medium'>
          {version}
        </span>
      )}
    </div>
  )
}
