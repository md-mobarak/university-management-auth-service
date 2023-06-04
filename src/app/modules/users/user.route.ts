import express from 'express'
import { createUserController } from './user.controller'
export const route = express.Router()

route.post('/create-user', createUserController)
