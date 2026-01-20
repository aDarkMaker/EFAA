import { useState } from 'react'

import { ActionButton } from '@/views/dashboard/components/action-button'
import { Header } from '@/views/dashboard/components/header'
import type { Task } from '@/views/dashboard/tasks/components/task-list'
import { TaskList } from '@/views/dashboard/tasks/components/task-list'
import { Terminal } from '@/views/dashboard/tasks/components/terminal'

const initialTasks: Task[] = [
  {
    id: 'ji_jiang_hao_jian_li_shou_cai',
    name: '帝江号基建收菜',
    description: '自动化收集所有生产线产出，包含信用点与经验书',
    checked: false,
  },
  {
    id: 'di_tu_yi_jie_suo_zi_yuan_dian_ri_chang_hui_shou',
    name: '地图已解锁资源点日常回收',
    description: '遍历主地图所有扇区，回收常规资源点',
    checked: false,
  },
  {
    id: 'di_tu_yi_jie_gui_zhong_zi_yuan_cai_ji',
    name: '地图已解锁贵重资源采集',
    description: '优先采集高价值稀有矿石与能源聚合体',
    checked: false,
  },
  {
    id: 'gao_nan_yu_ji_dian_ri_chang_zi_yuan_fu_ben_ti_li_xiao_hao',
    name: '高难淤积点/日常资源副本体力消耗',
    description: '自动代理最高效率副本，清空溢出体力',
    checked: false,
  },
  {
    id: 'ri_chang_shang_cheng_xin_lai_shou_chi_jia_hui_huan_wu_zi',
    name: '每日商城信赖收取+兑换物资',
    description: '领取每日免费礼包，使用信用点兑换折扣材料',
    checked: false,
  },
  {
    id: 'zhi_min_di_ri_chang_zi_yuan_jiao_huan_zi_dong_chao_gu',
    name: '殖民地日常资源交换+自动炒股',
    description: '监控市场波动，自动买入低价资源并交换',
    checked: false,
  },
]

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const handleTaskChange = (taskId: string, checked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, checked } : task,
      ),
    )
  }

  const handleExecute = () => {
    console.log('执行任务')
    // 这里可以添加执行逻辑
  }

  return (
    <div className='flex flex-col gap-5'>
      <Header
        title='每日代理系统'
        subtitle='Daily Automation Protocol v3.0'
        rightAction={<ActionButton label='一键执行' onClick={handleExecute} />}
      />

      <div className='flex gap-5'>
        <div className='flex-1 flex flex-col' style={{ minWidth: '400px' }}>
          <div className='text-text-gray text-sm mb-2 px-1'>Terminal</div>
          <Terminal />
        </div>
        <div className='flex-1 flex flex-col' style={{ minWidth: '400px' }}>
          <div className='text-text-gray text-sm mb-2 px-1'>Tasks</div>
          <div className='flex-1 overflow-y-auto'>
            <TaskList tasks={tasks} onTaskChange={handleTaskChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
