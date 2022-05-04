import { wrapServiceAction } from "..";
import UserRepo from "../../database/repositories/UserRepository";
import { NotFoundError } from "../../lib/errors";
import { UserValidation } from "../types/users";


export default wrapServiceAction({
    schema: UserValidation,
    handler: async (params: UserValidation) => {
        const users = await UserRepo.getAllUsers();
        if (!users) throw new NotFoundError('Users list is empty')

        return users;
    }
})