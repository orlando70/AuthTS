import { wrapServiceAction } from '..';
import { TokenFlag } from '../../database/enum';
import {omit} from 'lodash'
import UserRepo from "../../database/repositories/UserRepository";
import { AuthenticationError } from "../../lib/errors";
import { LoginRequest } from "../types/auth";
import User from "../../database/entity/User";
import { createSession } from "../../utils/auth";
import { bcryptCompare, generateJWTToken } from '../../utils';


export default wrapServiceAction({
    schema: LoginRequest,
    handler: async (params: LoginRequest) => {
        let user = await UserRepo.getUserByEmail(params.email);
        if (user === null) { throw new AuthenticationError("Email or password incorrect") };        

        let password = await bcryptCompare(params.password, user.password);
        if (!password) { throw new AuthenticationError("Email or password incorrect") };        

        const token = await createSession(user)

        return {
            user: omit(user, User.sensitiveFields),
            token: token
        }
    }
})