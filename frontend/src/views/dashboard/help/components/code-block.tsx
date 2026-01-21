import type { ReactNode } from 'react'

interface CodeBlockProps {
  language?: string
  children: ReactNode
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'SHELL',
  children,
}) => {
  return (
    <div className='relative bg-bg-sidebar border border-border rounded-lg p-5 my-5 font-mono text-sm text-text-main'>
      <div className='absolute top-0 right-0 bg-bg-card text-text-gray px-2.5 py-1 rounded-bl-lg text-xs'>
        {language}
      </div>
      <pre className='mt-4 overflow-x-auto'>{children}</pre>
    </div>
  )
}
