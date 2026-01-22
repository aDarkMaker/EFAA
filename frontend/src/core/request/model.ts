export interface RequestOptions extends RequestInit {
  url: string
  headers: HeadersInit
}

export class MutableResponse <T = any> {
  status: number = 0
  statusText: string = ''
  headers: Record<string, string> = {}
  data = {} as T

  async assign (response: Response) {
    const headers: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      headers[key] = value
    })

    const data = await response.clone().json()
    Object.assign(this, {
      status: response.status,
      statusText: response.statusText,
      headers,
      data,
    })
  }
}

export interface MwCtx {
  request: RequestOptions
  response: MutableResponse
}

export type Middleware = (ctx: MwCtx, next: () => Promise<void>) => Promise<void>
