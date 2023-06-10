import { NextFunction, Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendRespons from '../../../shared/sendRespons'
import httpStatus from 'http-status'

// import userService from './user.service'

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await UserService.createUser(user)

    sendRespons(res, {
      statusCode: httpStatus.OK,
      message: 'user success added',
      success: true,
      data: result,
    })

    next()
  }
)

export const UserController = {
  createUserController,
}
