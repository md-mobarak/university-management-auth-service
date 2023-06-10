import { IGenericErrorMessage } from './error'

export type IGenericRespons<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }

  data: T
}

export type IGenericErrorRespons = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
