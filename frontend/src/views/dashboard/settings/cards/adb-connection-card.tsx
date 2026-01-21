import { clsx } from 'clsx'

import { Card } from '@/views/dashboard/settings/components/card'
import { FormField } from '@/views/dashboard/settings/components/form-field'
import { SecondaryButton } from '@/views/dashboard/settings/components/secondary-button'
import { TextInput } from '@/views/dashboard/settings/components/text-input'

interface AdbConnectionCardProps {
  className?: string
}

export const AdbConnectionCard: React.FC<AdbConnectionCardProps> = ({
  className,
}) => {
  return (
    <Card
      title='ADB 连接状态'
      icon='ri-smartphone-line'
      rightAction={<SecondaryButton size='sm'>重新扫描</SecondaryButton>}
      className={className}
    >
      <div className='flex flex-col gap-4 mb-4'>
        <div
          className={clsx(
            'flex items-center gap-3 p-4',
            'bg-accent/5 border border-accent/20 rounded-lg',
          )}
        >
          <div
            className={clsx(
              'w-2.5 h-2.5 rounded-full',
              'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]',
            )}
          />
          <span className='text-text-main text-base flex-1'>
            设备已连接 (SN: 8A2X10023)
          </span>
        </div>

        <div
          className={clsx(
            'flex items-center gap-3 p-4',
            'bg-white/2 border border-border rounded-lg',
          )}
        >
          <div
            className={clsx(
              'w-2.5 h-2.5 rounded-full',
              'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
            )}
          />
          <span className='text-text-gray text-base flex-1'>
            模拟器 - 离线
          </span>
        </div>
      </div>

      <FormField label='ADB 端口'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <TextInput value='5037' className='flex-1' />
          <SecondaryButton>测试</SecondaryButton>
        </div>
      </FormField>
    </Card>
  )
}
