import type { ReactNode } from 'react'

interface StepItem {
  title: string
  content: ReactNode
}

interface StepListProps {
  items: StepItem[]
}

export const StepList: React.FC<StepListProps> = ({ items }) => {
  return (
    <ul className='list-none p-0 my-8'>
      {items.map((item, index) => (
        <li key={index} className='relative pl-12 mb-6'>
          <div className='absolute left-0 top-0 w-8 h-8 bg-bg-card text-accent rounded-full flex items-center justify-center font-bold text-base'>
            {index + 1}
          </div>
          <h4 className='font-bold text-lg text-text-main mb-2'>{item.title}</h4>
          <div className='text-base text-text-gray'>{item.content}</div>
        </li>
      ))}
    </ul>
  )
}
