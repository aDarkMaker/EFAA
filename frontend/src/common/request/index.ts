import baseUrlMiddleware from '@/common/request/middlewares/base-url'
import { throwErrorMiddleware } from '@/common/request/middlewares/throw-error'

import RequestHub from '../../core/request/request-hub'

const baseUrl = 'http://localhost:8000'

export const requestDefault = () => {
  const request = new RequestHub()
  request
    .use(throwErrorMiddleware)
    .use(baseUrlMiddleware(baseUrl))
  return request
}
