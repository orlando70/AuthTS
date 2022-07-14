import { AuthenticatedRequest, successResponse } from './index'
import { Request, Response } from 'express'
import * as authService from '../services/Auth'

export default class AuthController {
  public static register = async (req: Request, res: Response) => {
    const result = await authService.register({ ...req.body })
    return res.send(
      successResponse({
        data: result
      })
    )
  }

  public static login = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.login({ ...req.body })
    return res.send(
      successResponse({
        data: result
      })
    )
  }

  public static verifyEmail = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.verifyEmail({ token: req.params.token })
    return res.send(
      successResponse({
        data: result,
        message: 'Email verified successfully'
      })
    )
  }

  public static resetPasswordRequest = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.resetPasswordRequest({ ...req.body })
    return res.send(
      successResponse({
        data: result,
        message: 'Check your email to reset your password.'
      })
    )
  }

  public static resetPassword = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.resetPassword({ userId: req.session.userId, ...req.body })
    return res.send(
      successResponse({
        data: result
      })
    )
  }

  public static logout = async (req: AuthenticatedRequest, res: Response) => {
    const result = await authService.logout({
      token: (req.header('authorization') || ' ').split(' ')[1]
    })
    return res.send(
      successResponse({
        data: result
      })
    )
  }
}
