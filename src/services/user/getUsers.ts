import { wrapServiceAction } from "..";
import UserRepo from "../../database/repositories/UserRepository";
import { GetUserValidation } from "../types/users";


export default wrapServiceAction({
    schema: GetUserValidation,
    handler: async (params: GetUserValidation) => {
        const users = await UserRepo.getAllUsers();
        return users;
    }
})