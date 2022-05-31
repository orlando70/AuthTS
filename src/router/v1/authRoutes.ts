import express from 'express';
import AuthController from '../../controller/AuthController';
import { TokenFlag } from '../../database/enum';
import isAuthenticatedUser from '../../middleware/auth/isAuthenticatedUser';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify/:token', AuthController.verifyEmail);
router.post('/reset', isAuthenticatedUser(TokenFlag.RESET_PASSWORD), AuthController.resetPassword);
router.post('/initiate/reset', AuthController.resetPasswordRequest);
router.post('/logout', AuthController.logout);

export default router;