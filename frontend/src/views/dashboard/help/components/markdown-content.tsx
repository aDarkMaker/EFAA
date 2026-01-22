import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { generateHeadingId } from '../utils/heading-id'

interface MarkdownContentProps {
  content: string
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({
  content,
}) => {
  return (
    <div className='prose prose-invert max-w-none'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 自定义标题渲染，添加id用于锚点跳转
          h1: ({ node, children, ...props }) => {
            const text = String(children)
            const id = generateHeadingId(text)
            return (
              <h1
                id={id}
                className='font-bold text-3xl lg:text-5xl mb-8 text-text-main leading-tight scroll-mt-20'
                {...props}
              >
                {children}
              </h1>
            )
          },
          h2: ({ node, children, ...props }) => {
            const text = String(children)
            const id = generateHeadingId(text)
            return (
              <h2
                id={id}
                className='font-bold text-2xl lg:text-3xl mt-8 lg:mt-12 mb-5 text-text-main border-b border-border pb-4 scroll-mt-20'
                {...props}
              >
                {children}
              </h2>
            )
          },
          h3: ({ node, children, ...props }) => {
            const text = String(children)
            const id = generateHeadingId(text)
            return (
              <h3
                id={id}
                className='font-bold text-xl lg:text-2xl mt-6 lg:mt-8 mb-4 text-text-main scroll-mt-20'
                {...props}
              >
                {children}
              </h3>
            )
          },
          p: ({ node, ...props }) => (
            <p
              className='mb-5 text-justify text-base lg:text-lg leading-relaxed text-text-gray'
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul className='mb-5 pl-5 list-disc' {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className='mb-5 pl-5 list-decimal' {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className='mb-2.5 text-base lg:text-lg text-text-gray' {...props} />
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className='bg-bg-sidebar px-1.5 py-0.5 rounded text-sm text-accent'
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code
                className={`block bg-bg-sidebar p-4 rounded-lg overflow-x-auto text-sm text-text-gray font-mono ${className || ''}`}
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ node, children, ...props }: any) => {
            return (
              <pre
                className='mb-5 bg-bg-sidebar border border-border rounded-lg p-4 overflow-x-auto'
                {...props}
              >
                {children}
              </pre>
            )
          },
          blockquote: ({ node, ...props }) => (
            <blockquote
              className='border-l-4 border-accent pl-4 my-5 italic text-text-gray'
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a
              className='text-accent hover:underline'
              target='_blank'
              rel='noopener noreferrer'
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className='font-bold text-text-main' {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
