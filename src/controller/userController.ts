import { AuthenticatedRequest, successResponse } from './index';
import { Request, Response } from 'express';
import * as userService from '../services/User'

export default class userController {
    public static Users = async (req: Request, res: Response) => {
        const result = await userService.getUsers({...req.body});
        return res.send(
            successResponse({
                data: result
            })
        )
    };

    public static register = async (req: Request, res: Response) => {
        const result = await userService.register({...req.body})
        return res.send(
            successResponse({
                data: result
            })
        )
    }
}
