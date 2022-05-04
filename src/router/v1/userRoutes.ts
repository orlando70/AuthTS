import express from 'express';
import userController from '../../controller/userController';
const router = express.Router();

router.get('/all', userController.Users);
router.post('/register', userController.register)

export default router;