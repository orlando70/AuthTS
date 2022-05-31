import { AuthenticatedRequest, successResponse } from './index';
import { Request, Response } from 'express';
import * as userService from '../services/User'

export default class UserController {
    public static User = async (req: AuthenticatedRequest, res: Response) => {
        const result = await userService.getUser({userId: req.session.userId});
        return res.send(
            successResponse({
                data: result
            })
        )
    };

    
}
