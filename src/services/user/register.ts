import { wrapServiceAction } from "..";
import UserRepo from "../../database/repositories/UserRepository";
import { ServiceError } from "../../lib/errors";
import { CreateUserRequest } from "../types/users";


export default wrapServiceAction({
    schema: CreateUserRequest,
    handler: async (params: CreateUserRequest) => {
        const existingUser = await UserRepo.getUserByUsername(params.username);
        if (existingUser) throw new ServiceError("Username already exists")

        const newUser = await UserRepo.createUser(params);

        return newUser;
    }
})