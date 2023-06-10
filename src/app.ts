import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler'

import routes from './app/routes'
import httpStatus from 'http-status'

export const app: Application = express()
export const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// console.log(app.get('env'))

// api call
app.use('/api/v1/', routes)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  })
  next()
})
// app.use('/api/v1/user/', UserRouter)
// app.use('/api/v1/academic-semester/', AcademicSemesterRouter)

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing error logger')
// })

app.use(globalErrorHandler)
