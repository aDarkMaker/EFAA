import { useEffect, useState } from 'react'

import { useSidebar } from '@/views/dashboard/sidebar/context'

import { generateHeadingId } from '../utils/heading-id'

interface Heading {
  id: string
  level: number
  text: string
}

interface TableOfContentsProps {
  markdown: string
  onHeadingClick?: (id: string) => void
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  markdown,
  onHeadingClick,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([])
  const { collapsed } = useSidebar()

  useEffect(() => {
    // 从markdown中提取标题
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const extractedHeadings: Heading[] = []
    let match

    while ((match = headingRegex.exec(markdown)) !== null) {
      const level = match[1]?.length ?? 0
      const text = match[2]?.trim() ?? ''
      // 生成id：将标题文本转换为URL友好的格式
      const id = generateHeadingId(text)

      extractedHeadings.push({ id, level, text })
    }

    setHeadings(extractedHeadings)
  }, [markdown])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // 添加一个小的偏移量，避免被固定头部遮挡
      window.scrollBy(0, -20)
    }
    onHeadingClick?.(id)
  }

  if (headings.length === 0) {
    return null
  }

  // 计算左侧偏移量，考虑主侧边栏的宽度
  const leftOffset = collapsed ? 64 : 256 // 16 * 4 = 64px (collapsed) 或 64 * 4 = 256px (expanded)

  return (
    <div
      className='w-64 flex-shrink-0 border-r border-border bg-bg-sidebar/30 fixed top-0 bottom-0 overflow-hidden flex flex-col z-20'
      style={{
        left: `${leftOffset}px`,
      }}
    >
      <div className='flex-shrink-0 p-6 pb-4 border-b border-border bg-bg-sidebar/30 z-10'>
        <h3 className='font-bold text-lg text-text-main'>目录</h3>
      </div>
      <nav className='flex-1 overflow-y-auto scrollbar-thin-dark p-6 pt-4 space-y-1 min-h-0'>
        {headings.map((heading, index) => (
          <a
            key={`${heading.id}-${index}`}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              handleClick(heading.id)
            }}
            className={`block py-1.5 px-3 rounded text-sm transition-colors hover:bg-bg-sidebar hover:text-accent cursor-pointer ${
              heading.level === 1
                ? 'font-bold text-text-main'
                : heading.level === 2
                  ? 'font-medium text-text-gray'
                  : 'text-text-gray text-xs'
            }`}
            style={{
              paddingLeft: `${(heading.level - 1) * 12 + 12}px`,
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
