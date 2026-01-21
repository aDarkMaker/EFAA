import { Card } from '@/views/dashboard/settings/components/card'
import { FormField } from '@/views/dashboard/settings/components/form-field'
import { Select } from '@/views/dashboard/settings/components/select'

interface AdvancedSettingsCardProps {
  className?: string
}

export const AdvancedSettingsCard: React.FC<AdvancedSettingsCardProps> = ({
  className,
}) => {
  return (
    <Card
      title='高级参数'
      icon='ri-list-settings-line'
      className={className}
    >
      <div className='flex flex-col gap-5'>
        <FormField label='执行线程数'>
          <Select
            options={[
              { value: '4', label: '4 线程 (推荐)' },
              { value: '8', label: '8 线程 (高性能)' },
              { value: '16', label: '16 线程 (仅限服务器)' },
              { value: '1', label: '单线程 (调试模式)' },
            ]}
            defaultValue='4'
          />
        </FormField>

        <FormField label='日志保留策略'>
          <Select
            options={[
              { value: '7', label: '保留最近 7 天' },
              { value: '30', label: '保留最近 30 天' },
              { value: 'forever', label: '永久保存' },
            ]}
            defaultValue='7'
          />
        </FormField>

        <FormField label='网络代理模式'>
          <Select
            options={[
              { value: 'direct', label: '直连模式 (Direct)' },
              { value: 'system', label: '系统代理 (System Proxy)' },
              { value: 'custom', label: '自定义 HTTP 代理' },
            ]}
            defaultValue='direct'
          />
        </FormField>
      </div>
    </Card>
  )
}
