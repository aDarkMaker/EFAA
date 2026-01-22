import ApiCenter from '@/core/functional/api-center'

import * as automation from './automation'
import * as settings from './settings'
import * as tasks from './tasks'

const api = {
  ...tasks,
  ...settings,
  ...automation,
} as const

const { useApi } = new ApiCenter(api)

export { useApi }
