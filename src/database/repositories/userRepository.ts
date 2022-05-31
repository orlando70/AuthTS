import { getRepositoryWithQueryRunner } from '.';
import User from '../entity/User';


export default class UserRepo {
    private static getRepository = () => {
        return getRepositoryWithQueryRunner(User)
    };

    public static getAllUsers = async () => {
       return (await UserRepo.getRepository()).find();
    };

    public static createUser = async (user: Partial<User>) => {
        return (await UserRepo.getRepository()).save(user);
    };

    public static getUserById = async(id: string) => {
        return ((await UserRepo.getRepository()).findOne({
            where: {id}
        }));
    };

    public static getUserByEmail = async(email: string) => {
        return ((await UserRepo.getRepository()).findOne({
            where: {email}
        }));
    };

    public static updateUserById = async(id: string, updates: Partial<User>) => {
        (await UserRepo.getRepository()).update(id, updates);
        return UserRepo.getUserById(id);
    };
}