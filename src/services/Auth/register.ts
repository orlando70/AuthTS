import { wrapServiceAction } from '..'
import config, { AppEnvironmentEnum } from '../../config'
import redis from '../../database/redis'
import UserRepo from '../../database/repositories/UserRepository'
import { ServiceError } from '../../lib/errors'
import generalLogger from '../../lib/logger'
import { bcryptHash } from '../../utils'
import { createSession } from '../../utils/auth'
import Email from '../../utils/email'
import { RegisterRequest } from '../types/auth'

export default wrapServiceAction({
  schema: RegisterRequest,
  handler: async (params: RegisterRequest) => {
    const EXPIRY = 30 * 60

    const existingUser = await UserRepo.getUserByEmail(params.email)
    if (existingUser) throw new ServiceError('Account with this email already exists')

    const user = await UserRepo.createUser({
      ...params,
      password: await bcryptHash(params.password)
    })
    if (!user) throw new ServiceError('A problem occured during registration')

    const token = await createSession(user)

    await redis.setex(`email:verification:${token}`, EXPIRY, token)

    if (config.app.env !== AppEnvironmentEnum.TEST) {
      const email = new Email(token)
      await email.verification(user.email, 'Email Verification', user.firstName).catch(generalLogger.error)
    }

    return {
      user,
      token
    }
  }
})
