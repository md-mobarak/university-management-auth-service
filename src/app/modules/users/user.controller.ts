import { NextFunction, Request, Response } from 'express'
import userService from './user.service'

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      message: 'success user create',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
