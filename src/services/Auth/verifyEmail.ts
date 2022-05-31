import { wrapServiceAction } from "..";
import { EmailVerification } from "../types/auth";
import redis from '../../database/redis';
import UserRepo from "../../database/repositories/UserRepository";
import { decodeToken } from "../../utils";
import { AuthorizationError, ServiceError } from "../../lib/errors";
import { omit } from 'lodash';
import User from "../../database/entity/User"


export default wrapServiceAction({
  schema: EmailVerification,
  handler: async (params: EmailVerification) => {
    const token = await redis.get(`email:verification:${params.token}`);

    if (!token) { throw new AuthorizationError('Invalid or expired token.') }
    if (token) {
      const { userId } = await decodeToken(token);

      const user = await UserRepo.getUserById(userId);

      if (user?.isEmailVerified) throw new ServiceError('You are already verified.')

      if (token === params.token) {
        const verified = await UserRepo.updateUserById(userId, {
          isEmailVerified: true
        });
        return omit(verified, User.sensitiveFields);
      };
    };
  }
})