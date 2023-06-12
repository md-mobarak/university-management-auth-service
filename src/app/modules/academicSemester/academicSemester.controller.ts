import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
// import catchAsync from '../../../shared/catchAsync'
import sendRespons from '../../../shared/sendRespons'
import httpStatus from 'http-status'
import catchAsync from './../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { paginationFild } from '../../../constants/pagination'
import { IAcademicSemester } from './academicSemester.interface'
import { academicSemesterFilterableFields } from './academicSemester.constant'

const createSemesterController = catchAsync(
  async (req: Request, res: Response) => {
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
  }
)

const getAllSemestersController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields)
    const pagenationOftions = pick(req.query, paginationFild)

    // console.log(filters)

    const result = await academicSemesterService.getAllSemester(
      filters,
      pagenationOftions
    )
    sendRespons<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Academic semester Get successfully',
      success: true,
      meta: result.data,
      data: result.data,
    })
  }
)

const getSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await academicSemesterService.getSingleSemester(id)

    sendRespons<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Academic semester Get Single Data successfully',
      success: true,
      data: result,
    })
  }
)

const updateSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const updatedData = req.body
    const result = await academicSemesterService.updatedSemester(
      id,
      updatedData
    )

    sendRespons<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Academic semester updated successfully',
      success: true,
      data: result,
    })
    // next()
  }
)
const deleteSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params

    const result = await academicSemesterService.deleteSemester(id)

    sendRespons<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Academic semester deleted successfully',
      success: true,
      data: result,
    })
  }
)

export const AcademicSemesterController = {
  createSemesterController,
  getAllSemestersController,
  getSingleSemesterController,
  updateSemesterController,
  deleteSemesterController,
}
