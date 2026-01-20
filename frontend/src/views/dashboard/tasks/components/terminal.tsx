import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

interface TerminalProps {
  logs?: string[]
}

export const Terminal: React.FC<TerminalProps> = ({ logs = [] }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [displayLogs/*, setDisplayLogs */] = useState<string[]>(logs)

  useEffect(() => {
    // Auto scroll to bottom when new logs arrive
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayLogs])

  return (
    <div
      ref={terminalRef}
      className={clsx(
        'bg-bg-card border border-border rounded-xl px-6 py-4 flex flex-col flex-1',
        'overflow-y-auto scrollbar-thin-dark',
      )}
      style={{
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.6',
      }}
    >
      {displayLogs.length === 0
        ? (
          <div className='text-text-gray italic'>暂无日志输出...</div>
          )
        : (
            displayLogs.map((log, index) => (
              <div
                key={index}
                className='text-text-main mb-1'
                style={{
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <span className='text-text-gray'>$ </span>
                {log}
              </div>
            ))
          )}
    </div>
  )
}
