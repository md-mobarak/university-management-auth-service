import httpStatus from 'http-status'
import { ApiError } from '../../../errors/ApiError'
import {
  academicSemesterSearchAbleFiled,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { IPagenationOftions } from '../../../interfaces/pagination'
import { IGenericRespons } from '../../../interfaces/common'
import { paginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'
// import { log } from 'winston'

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
  filters: IAcademicSemesterFilters,
  pagenationOftions: IPagenationOftions
): Promise<IGenericRespons<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters

  const { page, limit, skip, sortOrder, sortBy } =
    paginationHelper.calculatePaginations(pagenationOftions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchAbleFiled.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await AcademicSemester.find({ whereCondition })
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
const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}
const updatedSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalied semester code')
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  )
  return result
}

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id)
  return result
}

export const academicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updatedSemester,
  deleteSemester,
}
