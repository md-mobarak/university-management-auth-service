import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorRespons } from '../interfaces/common'
import { IGenericErrorMessage } from '../interfaces/error'

const handleZodError = (err: ZodError): IGenericErrorRespons => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })
  const statusCode = 400
  const message = 'validation error'

  return {
    statusCode,
    message,
    errorMessages: errors,
  }
}

export default handleZodError
