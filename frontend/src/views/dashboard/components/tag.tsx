interface TagProps {
  children: React.ReactNode
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span
      className='px-4 py-1.5 rounded-full text-sm font-bold bg-accent/10 text-accent border border-accent/20'
      style={{ fontFamily: "'MiSans-Bold', sans-serif" }}
    >
      {children}
    </span>
  )
}
