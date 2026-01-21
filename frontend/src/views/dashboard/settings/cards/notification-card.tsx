import { clsx } from 'clsx'
import { useState } from 'react'

import { Checkbox } from '@/views/dashboard/settings/components/checkbox'

interface NotificationCardProps {
  className?: string
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  className,
}) => {
  const [enabled, setEnabled] = useState(true)

  return (
    <div
      className={clsx(
        'bg-accent/2 border border-accent rounded-2xl p-8',
        className,
      )}
    >
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div className='flex items-center gap-4 flex-1'>
          <i className='ri-notification-badge-line text-accent text-2xl flex-shrink-0' />
          <div>
            <div className='font-bold text-lg text-text-main'>
              消息通知服务
            </div>
            <div className='text-text-gray text-sm mt-1'>
              开启后，任务异常或完成时将推送到绑定的即时通讯软件
            </div>
          </div>
        </div>
        <Checkbox
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className='flex-shrink-0'
        />
      </div>
    </div>
  )
}
