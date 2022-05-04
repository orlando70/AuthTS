import {Response, NextFunction} from 'express';
import { AuthenticatedRequest} from '../../controller/index'
import { AuthenticationError } from '../../lib/errors';


export default (tokenFlag: string) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authorization = req.header('authorization')
            const token = authorization?.split(',')[1]

            if (!token) {
                return next (new AuthenticationError("You need to be authenticated to access this endpoint"))
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
}