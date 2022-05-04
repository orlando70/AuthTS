import { getRepositoryWithQueryRunner } from '.';
import {User} from '../entity/User';


export default class UserRepo {
    private static getRepository = () => {
        return getRepositoryWithQueryRunner(User)
    }

    public static getAllUsers = async () => {
       return (await UserRepo.getRepository()).find()
    }

    public static createUser = async (user: Partial<User>) => {
        return (await UserRepo.getRepository()).save(user)
    }
}