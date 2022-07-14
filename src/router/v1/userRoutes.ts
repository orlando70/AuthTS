import express from 'express'
import UserController from '../../controller/UserController'
import isAuthenticatedUser from '../../middleware/auth/isAuthenticatedUser'

const router = express.Router()

router.get('/:id', isAuthenticatedUser('AUTH'), UserController.User)

export default router
