import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
// import catchAsync from '../../../shared/catchAsync'
import sendRespons from '../../../shared/sendRespons'
import httpStatus from 'http-status'
import catchAsync from './../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFild } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'

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
      // meta:
      data: result,
    })
    next()
  }
)

const getAllSemestersController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const pagenationOftions = pick(req.query, paginationFild)

    const result = await academicSemesterService.getAllSemester(
      pagenationOftions
    )
    sendRespons<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Academic semester Get successfully',
      success: true,
      meta: result.data,
      data: result.data,
    })
    next()
  }
)

export const AcademicSemesterController = {
  createSemesterController,
  getAllSemestersController,
}
