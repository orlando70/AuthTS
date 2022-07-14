import { wrapServiceAction } from '..'
import { ResetPassword } from '../types/auth'
import redis from '../../database/redis'
import UserRepo from '../../database/repositories/UserRepository'
import { AuthorizationError } from '../../lib/errors'
import { bcryptHash, decodeToken } from '../../utils'
import Email from '../../utils/email'
import User from '../../database/entity/User'
import generalLogger from '../../lib/logger'
import config, { AppEnvironmentEnum } from '../../config'
import { omit } from 'lodash'

export default wrapServiceAction({
  schema: ResetPassword,
  handler: async (params: ResetPassword) => {
    const encodedToken = await redis.get(`password:Reset:${params.userId}`)

    if (!encodedToken) throw new AuthorizationError('Token is invalid or expired')

    const { userId } = await decodeToken(encodedToken)

    const updatedUser = await UserRepo.updateUserById(userId, {
      password: await bcryptHash(params.newPassword)
    }) as User

    if (config.app.env !== AppEnvironmentEnum.TEST) {
      const email = new Email(encodedToken)
      await email.passwordResetSuccess(updatedUser.email, 'Password Reset Successful', updatedUser.firstName)
        .catch(generalLogger.error)
    }

    return {
      updatedUser: omit(updatedUser, User.sensitiveFields)
    }
  }
})
