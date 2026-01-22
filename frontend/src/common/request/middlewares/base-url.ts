import type { Middleware } from '@/core/request/model'

const baseUrlMiddleware = (baseUrl: string): Middleware => async (ctx, next) => {
  if (/^https?:\/\//.test(ctx.request.url)) return await next()
  ctx.request.url = `${baseUrl}${ctx.request.url}`
  await next()
}

export default baseUrlMiddleware
