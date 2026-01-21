import { clsx } from 'clsx'
import { Outlet } from 'react-router-dom'

import { useSidebar } from '@/views/dashboard/sidebar/context'
import { Sidebar } from '@/views/dashboard/sidebar/sidebar'

export const Dashboard: React.FC = () => {
  const { collapsed } = useSidebar()

  return (
    <>
      <Sidebar />
      <main
        className={clsx(
          'flex-1 px-10 py-15 flex flex-col min-h-fit',
          'transition-[margin-left] duration-200',
          'lg:px-20',
          collapsed ? 'ml-16' : 'ml-64',
        )}
        style={{
          background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)',
        }}
      >
        <Outlet />
      </main>
    </>
  )
}
