import baseUrlMiddleware from '@/common/request/middlewares/base-url'
import { throwErrorMiddleware } from '@/common/request/middlewares/throw-error'

import RequestHub from '../../core/request/request-hub'

const getBaseUrl = async () => {
  // 如果在 pywebview 环境中
  if (window.pywebview && window.pywebview.api && window.pywebview.api.get_api_port) {
    try {
      const port = await window.pywebview.api.get_api_port()
      return `http://127.0.0.1:${port}`
    } catch (e) {
      console.error('Failed to get port from pywebview', e)
    }
  }
  // 默认回退（开发环境或获取失敗）
  return 'http://127.0.0.1:8000'
}

export const requestDefault = async () => {
  const baseUrl = await getBaseUrl()
  const request = new RequestHub()
  request
    .use(throwErrorMiddleware)
    .use(baseUrlMiddleware(baseUrl))
  return request
}
