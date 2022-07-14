import redis from '../../database/redis'
import * as utils from '../../utils'
import { wrapServiceAction } from '..'
import { Logout } from '../types/auth'

export default wrapServiceAction({
  schema: Logout,
  handler: async (params: Logout) => {
    const { accountId, counter } = await utils.decodeToken(params.token)

    const sessionKeyPrefix = `sessions:${accountId}`
    const sessionKey = `sessions:${accountId}:${counter}`

    await redis.del(sessionKey)
    await redis.srem(sessionKeyPrefix, sessionKey)
  }
})
