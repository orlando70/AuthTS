/* eslint-disable no-lone-blocks */
import { Response, NextFunction } from 'express'
import { AuthenticatedRequest } from '../../controller/index'
import redis from '../../database/redis'
import UserRepo from '../../database/repositories/UserRepository'
import { AuthenticationError, ServiceError } from '../../lib/errors'
import { decodeToken } from '../../utils'

export default (tokenFlag: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorization = req.header('authorization') || ''
      const token = authorization.split(' ')[1]

      if (!token) {
        return next(new AuthenticationError('You need to be authenticated to access this endpoint'))
      }

      const { userId, flag, counter } = await decodeToken(token)

      const user = await UserRepo.getUserById(userId)

      if (!userId) {
        return next(new ServiceError('Unable to verify token'))
      }

      if (!user?.isEmailVerified) {
        return next(new AuthenticationError('Kindly verify your email address to continue'))
      }

      if (tokenFlag !== flag) {
        return next(new ServiceError(`Token is not valid for ${tokenFlag}`))
      }

      const session = await redis.get(`sessions:${userId}:${counter as string}`)
      if (!user || (tokenFlag === 'AUTH' && !session)) {
        return next(new AuthenticationError('token is invalid'))
      }

      req.session = {
        userId: user.id
      }
      return next()
    } catch (error: any) {
      switch (error.name) {
        case 'TokenExpiredError': {
          return next(new AuthenticationError('token has expired'))
        };
        case 'JsonWebTokenError': {
          return next(new AuthenticationError(error.message))
        };
        case 'NotBeforeError': {
          return next(new AuthenticationError(error.message))
        };
        default: {
          return next(error)
        }
      }
    }
  }
}
