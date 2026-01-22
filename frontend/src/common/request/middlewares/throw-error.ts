import type { Middleware } from '@/core/request/model'

enum Retcode {
  SUCCESS = 0,
  NO_RESPONSE = 10000,
}

class RetcodeError extends Error {
  constructor (public readonly retcode: number, public override readonly message: string) {
    super(message)
  }
}

export const throwErrorMiddleware: Middleware = async (ctx, next) => {
  await next()
  if (ctx.response.status === 0) {
    // 0 means no response
    throw new RetcodeError(Retcode.NO_RESPONSE, 'No response')
  }

  const data = ctx.response.data as any
  // 这里避免有些外部接口返回的数据没有 retcode 字段，
  // data.retcode 为 undefined 时，不会抛出错误
  if (data.retcode && data.retcode !== Retcode.SUCCESS) {
    throw new RetcodeError(data.retcode, data.message)
  }
}
