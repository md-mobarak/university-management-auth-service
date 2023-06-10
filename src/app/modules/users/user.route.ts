import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const route = express.Router()

route.post(
  '/create-user',
  validateRequest(UserValidation.cerateUserZodSchema),
  UserController.createUserController
)

export const UserRouter = route
