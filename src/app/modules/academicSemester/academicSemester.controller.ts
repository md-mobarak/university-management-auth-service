import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendRespons from '../../../shared/sendRespons'
import httpStatus from 'http-status'

const createSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result = await academicSemesterService.createSemester(
      academicSemesterData
    )
    // next()
    sendRespons(res, {
      statusCode: httpStatus.OK,
      message: 'Academic semester created  successfully',
      success: true,
      data: result,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createSemesterController,
}
