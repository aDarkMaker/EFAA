import type { ReactNode } from 'react'

interface InfoBoxProps {
  icon?: string
  children: ReactNode
}

export const InfoBox: React.FC<InfoBoxProps> = ({
  icon = 'ri-information-fill',
  children,
}) => {
  return (
    <div className='bg-bg-sidebar/50 border-l-4 border-accent p-5 rounded-r-lg my-8 flex gap-4 text-text-main text-base'>
      <i className={`${icon} text-accent text-2xl flex-shrink-0`} />
      <div>{children}</div>
    </div>
  )
}
