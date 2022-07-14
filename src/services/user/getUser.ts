import { wrapServiceAction } from '..'
import UserRepo from '../../database/repositories/UserRepository'
import { GetUserRequest } from '../types/users'

export default wrapServiceAction({
  schema: GetUserRequest,
  handler: async (params: GetUserRequest) => {
    const users = await UserRepo.getUserById(params.userId)
    return users
  }
})
