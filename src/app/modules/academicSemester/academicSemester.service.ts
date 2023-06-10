import httpStatus from 'http-status'
import { ApiError } from '../../../errors/ApiError'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPagenationOftions } from '../../../interfaces/pagination'
import { IGenericRespons } from '../../../interfaces/common'
import { paginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalied semester code')
  }

  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemester = async (
  pagenationOftions: IPagenationOftions
): Promise<IGenericRespons<IAcademicSemester[]>> => {
  const { page, limit, skip, sortOrder, sortBy } =
    paginationHelper.calculatePaginations(pagenationOftions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find()
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterService = {
  createSemester,
  getAllSemester,
}
