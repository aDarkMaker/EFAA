import { Header } from '@/views/dashboard/components/header'

import { DevLogCard } from './components/dev-log-card'

const devLogs = [
  {
    version: 'v2.4.0',
    date: '2024-05-20',
    title: '新增干员排班智能推荐系统',
    description:
      '基于基建技能与干员心情值，自动计算最优排班方案。优化了算法效率，减少了计算等待时间。',
    tags: ['Feature', '基建'],
  },
  {
    version: 'v2.3.5',
    date: '2024-05-15',
    title: 'UI 界面全面升级深色模式',
    description:
      '重新设计了配色方案，降低视觉疲劳。针对夜间操作场景进行了专门的对比度优化，提升阅读体验。',
    tags: ['Design', 'UI/UX'],
  },
  {
    version: 'v2.3.1',
    date: '2024-05-08',
    title: '修复公开招募计算器错误',
    description:
      '修正了部分干员标签组合无法正确识别的问题。更新了最新的干员数据池，支持新实装干员。',
    tags: ['Bugfix', '公招'],
  },
  {
    version: 'v2.3.0',
    date: '2024-04-30',
    title: '材料合成路径规划工具上线',
    description:
      '一键计算精英化所需材料的最优刷图路径和合成路线。支持导入仓库数据，自动扣除已有库存。',
    tags: ['New Tool', '材料'],
  },
  {
    version: 'v2.2.8',
    date: '2024-04-20',
    title: '性能优化：启动速度提升30%',
    description:
      '重构了底层数据加载逻辑，显著缩短冷启动时间。优化内存占用，老旧设备运行更加流畅。',
    tags: ['Performance', 'System'],
  },
  {
    version: 'v2.2.5',
    date: '2024-04-12',
    title: '新增多账号管理功能',
    description:
      '支持一键切换不同游戏账号，数据独立保存互不干扰。适合拥有多个小号的博士使用。',
    tags: ['Feature', 'Account'],
  },
]

export const Portal: React.FC = () => {
  return (
    <div className='flex-1 flex relative'>
      {/* Main Content */}
      <div className='flex-1 flex flex-col relative pr-6 min-w-72'>
        <Header
          title='开发日志'
          subtitle='追踪最新功能更新与优化记录，持续提升干员体验。'
        />

        <div className='grid grid-cols-1 gap-4'>
          {devLogs.map((log, index) => (
            <DevLogCard
              key={index}
              version={log.version}
              date={log.date}
              title={log.title}
              description={log.description}
              tags={log.tags}
              onReadMore={() => {
                // TODO: Implement read more action
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
