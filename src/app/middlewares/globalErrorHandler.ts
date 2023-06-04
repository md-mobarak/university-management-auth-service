import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import { handleValidationerror } from '../../errors/handleValidationerror'
import { ApiError } from '../../errors/ApiError'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500
  let message = 'something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []
  if (err?.name === 'ValidationError') {
    const simplefyError = handleValidationerror(err)
    statusCode = simplefyError?.statusCode
    message = simplefyError?.message
    errorMessages = simplefyError?.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}
