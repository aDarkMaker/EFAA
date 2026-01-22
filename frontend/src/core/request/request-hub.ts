import type { Middleware, MwCtx, RequestOptions } from './model'
import { MutableResponse } from './model'

const compose = (middlewares: Middleware[]) => {
  const funcs = [...middlewares].flat(Infinity)

  return async (ctx: MwCtx, next?: () => Promise<void>) => {
    const dispatch = async (i: number) => {
      const fn = i === funcs.length ? next : funcs[i]
      if (!fn) return
      const nextProxy = () => dispatch(i + 1)
      await fn(ctx, nextProxy)
    }
    await dispatch(0)
  }
}

export class RequestHub {
  middlewares: Middleware[] = []

  use (middleware: Middleware) {
    this.middlewares.push(middleware)
    return this
  }

  async get <T = unknown> (url: string, options: RequestInit = {}) {
    const requestOptions = {
      url,
      method: 'GET',
      headers: {},
      ...options,
    }
    return this.dispatch(requestOptions) as Promise<MutableResponse<T>>
  }

  async post <T = unknown> (url: string, data: unknown = {}, options: RequestInit = {}) {
    const requestOptions = {
      url,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    }
    return this.dispatch(requestOptions) as Promise<MutableResponse<T>>
  }

  async dispatch (requestOptions: RequestOptions) {
    const ctx: MwCtx = {
      request: requestOptions,
      response: new MutableResponse(),
    }
    const middlewareFn = compose([...this.middlewares, this.send])
    await middlewareFn(ctx)
    return ctx.response
  }

  async send (ctx: MwCtx) {
    const response = await fetch(ctx.request.url, ctx.request)
    await ctx.response.assign(response)
  }
}

export default RequestHub
