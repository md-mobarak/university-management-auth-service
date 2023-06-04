import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorRespons } from '../interfaces/common'

export const handleValidationerror = (
  err: mongoose.Error.ValidationError
): IGenericErrorRespons => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(el => {
    return {
      path: el.path,
      message: el.message,
    }
  })
  const statusCode = 500
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
