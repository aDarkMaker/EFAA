import type { ReactNode } from 'react'

interface DocContentProps {
  children: ReactNode
}

export const DocContent: React.FC<DocContentProps> = ({ children }) => {
  return (
    <div className='flex-1 p-6 lg:p-16 overflow-y-auto scrollbar-thin-dark'>
      <div className='max-w-4xl mx-auto'>{children}</div>
    </div>
  )
}
