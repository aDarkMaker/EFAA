import { Card } from '@/views/dashboard/settings/components/card'
import { FormField } from '@/views/dashboard/settings/components/form-field'
import { PasswordInput } from '@/views/dashboard/settings/components/password-input'
import { TextInput } from '@/views/dashboard/settings/components/text-input'

interface BasicInfoCardProps {
  className?: string
}

export const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  className,
}) => {
  return (
    <Card
      title='基本信息配置'
      icon='ri-user-settings-line'
      className={className}
    >
      <div className='flex flex-col gap-4'>
        <FormField label='设备别名'>
          <TextInput placeholder='请输入设备名称' defaultValue='WorkStation-Alpha' />
        </FormField>

        <FormField label='默认管理员邮箱'>
          <TextInput type='email' placeholder='admin@example.com' />
        </FormField>

        <FormField label='API 密钥 (Access Key)'>
          <PasswordInput value='sk-xxxxxxxxxxxxxxxx' readOnly />
        </FormField>
      </div>
    </Card>
  )
}
