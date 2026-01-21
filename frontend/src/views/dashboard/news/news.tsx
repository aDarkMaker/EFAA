import { useState } from 'react'

import { Header } from '@/views/dashboard/components/header'

import { NewsCard } from './components/news-card'
import { SearchBar } from './components/search-bar'

const newsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badge: '预告片',
    badgeType: 'video' as const,
    title: '赛博朋克风格新作《霓虹深渊：无限》今日正式开启公测，即刻体验未来世界的战斗狂潮',
    source: '官方频道',
    sourceAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    timeAgo: '2h',
    likes: 12500,
    comments: 892,
    colSpan: 2,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badge: '更新日志',
    badgeType: 'default' as const,
    title: '《Apex Legends》第18赛季改动详解：排位机制重做，新英雄技能前瞻',
    source: 'Apex资讯站',
    sourceInitial: 'A',
    timeAgo: '45m',
    likes: 3400,
    comments: 0,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badge: '精彩集锦',
    badgeType: 'video' as const,
    title: 'VALORANT 大师赛半决赛：Fnatic 让二追三惊天逆转，晋级总决赛！',
    source: '电竞速递',
    sourceInitial: 'V',
    timeAgo: '3h',
    likes: 8100,
    comments: 0,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badge: '硬件评测',
    badgeType: 'default' as const,
    title: 'RTX 5090 显卡性能曝光？据传将搭载全新架构，功耗控制更出色',
    source: '极客湾',
    sourceInitial: 'T',
    timeAgo: '5h',
    likes: 5600,
    comments: 0,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1612287230217-969b65929618?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    badge: '独立游戏',
    badgeType: 'default' as const,
    title: '像素风肉鸽游戏《Loop Hero》移动版今日上线，随时随地开启循环冒险',
    source: '独立游戏君',
    sourceInitial: 'I',
    timeAgo: '1d',
    likes: 2200,
    comments: 0,
  },
]

export const News: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='flex-1 flex flex-col'>
      <Header
        title='最新资讯'
        subtitle='看看鹰小姐的震撼首发'
        rightAction={
          <div className='hidden lg:block'>
            <SearchBar value={searchValue} onChange={setSearchValue} />
          </div>
        }
      />

      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 flex-1 overflow-y-auto scrollbar-thin-dark'>
        {newsData.map((news) => (
          <NewsCard
            key={news.id}
            image={news.image}
            badge={news.badge}
            badgeType={news.badgeType}
            title={news.title}
            source={news.source}
            sourceAvatar={news.sourceAvatar}
            sourceInitial={news.sourceInitial}
            timeAgo={news.timeAgo}
            likes={news.likes}
            comments={news.comments}
            colSpan={news.colSpan}
            onPlay={() => {
              // TODO: Implement play action
            }}
          />
        ))}
      </div>
    </div>
  )
}
