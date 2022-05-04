import { getRepositoryWithQueryRunner } from ".";
import AllowedDevices from "../entity/AllowedDevice";
import User from "../entity/User";

export default class AllowedDevicesRepo {
    private static getRepository = () => {
        return getRepositoryWithQueryRunner(AllowedDevices);
    }

    public static getUserAllowedDevices = async (user: User) => {
        return (await AllowedDevicesRepo.getRepository()).find({
            where: {user}
        });
    }

    public static createAllowedDevice = async (device: AllowedDevices) => {
        return (await AllowedDevicesRepo.getRepository()).save(device)
    }
}