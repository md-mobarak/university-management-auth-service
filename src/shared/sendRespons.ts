import { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  meta: {
    page: number
    limit: number
    total: number
  }
  message?: string | null
  data?: T | null
}

const sendRespons = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    meta: data?.meta || null,
    message: data.message || null,
    data: data.data || null,
  }

  res.status(data.statusCode).json(responseData)
}

export default sendRespons
