import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { route } from './app/modules/users/user.route'
// import { log } from 'winston'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'

export const app: Application = express()
export const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// console.log(app.get('env'))

// api call
app.use('/api/v1/user/', route)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'ore baba error')
  // res.send('hello world ')
  next('ore baba error')
})

app.use(globalErrorHandler)
