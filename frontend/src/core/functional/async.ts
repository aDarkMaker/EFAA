import { type DependencyList, useEffect, useRef, useState } from 'react'

import { useDelegate } from './delegate'

type FalsyValue = false | null | undefined | '' | 0

export const useAsync = <T, E = Error>(
  task: FalsyValue | (() => Promise<T>),
  deps: DependencyList,
) => {
  const [result, setResult] = useState<T | undefined>(undefined)
  const [error, setError] = useState<E | undefined>(undefined)

  const seqRef = useRef(0)
  const succSeq = () => {
    seqRef.current += 1
    return seqRef.current
  }

  const refresh = useDelegate(() => {
    if (!task) return

    const seq = succSeq()

    task()
      .then((result) => {
        if (seq !== seqRef.current) return
        setResult(result)
        setError(undefined)
      })
      .catch((error) => {
        if (seq !== seqRef.current) return
        setResult(undefined)
        setError(error)
      })

    return () => {
      succSeq()
    }
  })

  const clear = useDelegate(() => {
    setResult(undefined)
    setError(undefined)
  })

  useEffect(() => {
    refresh()
  }, deps)

  return [result, error, refresh, clear] as const
}
