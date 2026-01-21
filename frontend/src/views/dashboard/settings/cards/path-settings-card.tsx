import { Card } from '@/views/dashboard/settings/components/card'
import { FormField } from '@/views/dashboard/settings/components/form-field'
import { SecondaryButton } from '@/views/dashboard/settings/components/secondary-button'
import { TextInput } from '@/views/dashboard/settings/components/text-input'

interface PathSettingsCardProps {
  className?: string
}

export const PathSettingsCard: React.FC<PathSettingsCardProps> = ({
  className,
}) => {
  return (
    <Card
      title='路径配置'
      icon='ri-folder-settings-line'
      className={className}
    >
      <div className='flex flex-col gap-5'>
        <FormField label='工作区根目录'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <TextInput
              icon='ri-hard-drive-2-line'
              value='D:\Projects\AutoWorkSpace'
              readOnly
              className='flex-1'
            />
            <SecondaryButton>浏览...</SecondaryButton>
          </div>
        </FormField>

        <FormField label='日志输出路径'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <TextInput
              icon='ri-file-list-2-line'
              value='D:\Projects\AutoWorkSpace\Logs'
              readOnly
              className='flex-1'
            />
            <SecondaryButton>浏览...</SecondaryButton>
          </div>
        </FormField>
      </div>
    </Card>
  )
}
