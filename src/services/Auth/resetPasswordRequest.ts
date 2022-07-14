import { wrapServiceAction } from '..'
import { ResetPasswordRequest } from '../types/auth'
import redis from '../../database/redis'
import UserRepo from '../../database/repositories/UserRepository'
import { AuthenticationError } from '../../lib/errors'
import { generateJWTToken } from '../../utils'
import config, { AppEnvironmentEnum } from '../../config'
import Email from '../../utils/email'
import { TokenFlag } from '../../database/enum'

export default wrapServiceAction({
  schema: ResetPasswordRequest,
  handler: async (params: ResetPasswordRequest) => {
    const existingUser = await UserRepo.getUserByEmail(params.email)
    if (!existingUser) throw new AuthenticationError('Email is not registered')

    // Delete any active session;
    const sessionKeyPrefix = `sessions:${existingUser.id}`
    const sessionKey = `sessions:${existingUser.id}`

    await redis.del(sessionKey)
    await redis.srem(sessionKeyPrefix, sessionKey)

    const token = await generateJWTToken(
      {
        userId: existingUser.id,
        flag: TokenFlag.RESET_PASSWORD
      }
    )

    redis.setex(`password:Reset:${existingUser.id}`, config.app.passwordResetTTL, token)

    if (config.app.env !== AppEnvironmentEnum.TEST) {
      const email = new Email(token)
      await email.resetPassword(params.email, 'Password Reset Email', existingUser.firstName)
    }

    return {
      token
    }
  }
})
