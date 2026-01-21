interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索游戏、攻略、视频...',
  value,
  onChange,
}) => {
  return (
    <div className='bg-bg-card border border-border rounded-full px-6 py-3 flex items-center gap-3 min-w-64 lg:min-w-80'>
      <i className='ri-search-line text-text-gray' />
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className='flex-1 bg-transparent border-none outline-none text-text-main placeholder:text-text-gray'
      />
    </div>
  )
}
