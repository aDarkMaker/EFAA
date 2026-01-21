import { clsx } from 'clsx'

import { Header } from '@/views/dashboard/components/header'
import { AdbConnectionCard } from '@/views/dashboard/settings/cards/adb-connection-card'
import { AdvancedSettingsCard } from '@/views/dashboard/settings/cards/advanced-settings-card'
import { BasicInfoCard } from '@/views/dashboard/settings/cards/basic-info-card'
import { GeneralOptionsCard } from '@/views/dashboard/settings/cards/general-options-card'
import { NotificationCard } from '@/views/dashboard/settings/cards/notification-card'
import { PathSettingsCard } from '@/views/dashboard/settings/cards/path-settings-card'

export const Settings: React.FC = () => {
  return (
    <div className='flex flex-col gap-10'>
      <Header
        title='系统偏好设置'
        rightAction={
          <div className='flex items-center gap-5'>
            <span className='text-text-gray text-base'>当前版本: v1.0.0</span>
            <button
              className={clsx(
                'bg-accent text-text-reverse px-6 py-3 rounded-lg',
                'font-bold text-base cursor-pointer',
                'flex items-center gap-2 transition-transform',
                'hover:-translate-y-0.5 active:translate-y-0',
              )}
            >
              <i className='ri-download-cloud-2-line' />
              检查更新
            </button>
          </div>
        }
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <PathSettingsCard className='lg:col-span-2' />
        <AdbConnectionCard />
        <GeneralOptionsCard />
        <BasicInfoCard />
        <AdvancedSettingsCard />
        <NotificationCard className='lg:col-span-2' />
      </div>
    </div>
  )
}
