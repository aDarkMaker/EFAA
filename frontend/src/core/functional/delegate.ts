import { useCallback, useRef } from 'react'

export const useDelegate = <T extends (...args: unknown[]) => unknown>(func: T | undefined) => {
  const funcRef = useRef<T>(func)
  funcRef.current = func
  return useCallback((...args: Parameters<T>) => funcRef.current?.(...args), [])
}
