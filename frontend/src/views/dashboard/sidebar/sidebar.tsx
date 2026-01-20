import 'remixicon/fonts/remixicon.css'

import { clsx } from 'clsx'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { useSidebar } from './context'

const navItems = [
  { id: 'home', label: '主页', icon: 'ri-dashboard-line', path: '/' },
  { id: 'tasks', label: '任务', icon: 'ri-task-line', path: '/tasks' },
  { id: 'settings', label: '设置', icon: 'ri-settings-6-line', path: '/settings' },
  { id: 'news', label: '资讯', icon: 'ri-news-line', path: '/news' },
  { id: 'help', label: '帮助', icon: 'ri-question-line', path: '/help' },
]

const ToolBtn: React.FC<{
  icon: string,
  onClick: () => void,
  ariaLabel: string,
  title: string,
}> = ({ icon, onClick, ariaLabel, title }) => {
  return (
    <button
      className={clsx(
        'w-10 h-10 rounded-md text-slate-600 hover:text-text-gray',
        'flex items-center justify-center',
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
    >
      <i className={icon} />
    </button>
  )
}

export const Sidebar: React.FC = () => {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <div
      className={clsx(
        'fixed inset-y-0 left-0 z-30',
        'flex h-full flex-col',
        'border-r transition-[width] duration-200',
        'bg-bg-sidebar border-border',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* brand */}
      <div className='sidebar-brand flex h-14 items-center px-5 my-4'>
        <div className='flex items-center gap-3 overflow-hidden'>
          {!collapsed && (
            <div className='brand-text flex min-w-0 flex-col'>
              <span className='brand-title truncate text-base font-semibold text-text-main'>
                明日方舟-难道说
              </span>
              <span className='brand-subtitle truncate text-xs text-text-gray'>
                打灰小帮手
              </span>
            </div>
          )}
        </div>
      </div>

      {/* nav */}
      <nav className='sidebar-nav flex-1 overflow-y-auto px-2 py-3'>
        <div className='space-y-1'>
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.id === 'home'}
                className={({ isActive }) => clsx(
                  'nav-item w-full',
                  'flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm',
                  'transition-colors font-extrabold',
                  isActive
                    ? 'bg-accent text-text-reverse'
                    : 'text-text-gray hover:bg-bg-card hover:text-text-main',
                  collapsed && 'justify-center px-2',
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className='nav-icon grid h-8 w-8 place-items-center'>
                  <i className={clsx(
                    'text-xl',
                    item.icon,
                  )}
                  />
                </span>

                {!collapsed && <span className='nav-label truncate'>{item.label}</span>}
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* footer */}
      <div
        className={clsx(
          'sidebar-footer border-t border-border px-3 py-3 flex items-center',
          collapsed ? 'flex-col' : 'flex-row-reverse justify-between',
        )}
      >
        <ToolBtn
          icon={collapsed ? 'ri-expand-right-line' : 'ri-expand-left-line'}
          onClick={() => setCollapsed(!collapsed)}
          ariaLabel={collapsed ? '展开侧边栏' : '折叠侧边栏'}
          title={collapsed ? '展开' : '折叠'}
        />
        <ToolBtn
          icon='ri-close-line'
          onClick={() => {}}
          ariaLabel='关闭'
          title='关闭'
        />
      </div>
    </div>
  )
}
