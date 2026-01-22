import { useEffect, useState } from 'react'

import { getShoppingSettings, updateShoppingSettings, type ShoppingStrategy } from '@/common/api/settings'
import { Card } from '@/views/dashboard/settings/components/card'
import { Checkbox } from '@/views/dashboard/settings/components/checkbox'
import { FormField } from '@/views/dashboard/settings/components/form-field'
import { Select } from '@/views/dashboard/settings/components/select'

interface ShoppingStrategyCardProps {
  className?: string
}

export const ShoppingStrategyCard: React.FC<ShoppingStrategyCardProps> = ({
  className,
}) => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [strategy, setStrategy] = useState<ShoppingStrategy | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const data = await getShoppingSettings()
      setStrategy(data)
    } catch (error) {
      console.error('Failed to load shopping settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (newStrategy: ShoppingStrategy) => {
    try {
      setSaving(true)
      await updateShoppingSettings(newStrategy)
      setStrategy(newStrategy)
    } catch (error) {
      console.error('Failed to save shopping settings:', error)
      // 恢复原值
      await loadSettings()
    } finally {
      setSaving(false)
    }
  }

  const handleStrategyChange = (value: string) => {
    if (!strategy) return

    const newStrategy: ShoppingStrategy = {
      ...strategy,
      selected_strategy: value as 'priority_items' | 'lowest_price',
    }
    saveSettings(newStrategy)
  }

  const handleItemChange = (value: string) => {
    if (!strategy) return

    const newStrategy: ShoppingStrategy = {
      ...strategy,
      strategies: {
        ...strategy.strategies,
        priority_items: {
          ...strategy.strategies.priority_items,
          selected_item: value,
        },
      },
    }
    saveSettings(newStrategy)
  }

  const handleRefreshChange = (checked: boolean) => {
    if (!strategy) return

    const newStrategy: ShoppingStrategy = {
      ...strategy,
      is_refresh: checked,
    }
    saveSettings(newStrategy)
  }

  if (loading || !strategy) {
    return (
      <Card
        title='购物策略配置'
        icon='ri-shopping-cart-line'
        className={className}
      >
        <div className='text-text-gray text-center py-8'>加载中...</div>
      </Card>
    )
  }

  const strategyOptions = [
    { value: 'priority_items', label: '优先购买指定物品' },
    { value: 'lowest_price', label: '优先购买折扣商品' },
  ]

  const itemOptions = [
    { value: '', label: '请选择物品' },
    ...strategy.strategies.priority_items.target_items.map((item) => ({
      value: item.name,
      label: item.name,
    })),
  ]

  return (
    <Card
      title='购物策略配置'
      icon='ri-shopping-cart-line'
      className={className}
    >
      <div className='flex flex-col gap-6'>
        <FormField label='购物策略'>
          <Select
            value={strategy.selected_strategy}
            onChange={(e) => handleStrategyChange(e.target.value)}
            options={strategyOptions}
            disabled={saving}
          />
        </FormField>

        {strategy.selected_strategy === 'priority_items' && (
          <FormField label='优先购买的物品'>
            <Select
              value={strategy.strategies.priority_items.selected_item}
              onChange={(e) => handleItemChange(e.target.value)}
              options={itemOptions}
              disabled={saving}
            />
          </FormField>
        )}

        <Checkbox
          label='启用商店刷新'
          description='当信用点充足时，自动刷新商店以获取更多商品选择'
          checked={strategy.is_refresh}
          onChange={(e) => handleRefreshChange(e.target.checked)}
          disabled={saving}
        />
      </div>
    </Card>
  )
}
