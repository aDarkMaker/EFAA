import { useState } from 'react'

import { Card } from '@/views/dashboard/settings/components/card'
import { Checkbox } from '@/views/dashboard/settings/components/checkbox'

interface GeneralOptionsCardProps {
  className?: string
}

interface CheckboxOption {
  id: string
  label: string
  description: string
  checked: boolean
}

export const GeneralOptionsCard: React.FC<GeneralOptionsCardProps> = ({
  className,
}) => {
  const [options, setOptions] = useState<CheckboxOption[]>([
    {
      id: 'auto-start',
      label: '开机自动启动',
      description: '系统启动时自动运行后台服务',
      checked: true,
    },
    {
      id: 'minimize-to-tray',
      label: '最小化到托盘',
      description: '点击关闭按钮时仅隐藏主窗口',
      checked: true,
    },
    {
      id: 'developer-mode',
      label: '启用开发者模式',
      description: '显示更多调试信息和日志',
      checked: false,
    },
  ])

  const handleToggle = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, checked: !opt.checked } : opt)),
    )
  }

  return (
    <Card
      title='通用选项'
      icon='ri-equalizer-line'
      className={className}
    >
      <div className='flex flex-col gap-4'>
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.label}
            description={option.description}
            checked={option.checked}
            onChange={() => handleToggle(option.id)}
          />
        ))}
      </div>
    </Card>
  )
}
