import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: 'Invalied Id',
    },
  ]
  const statusCode = 500
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
