import { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  academicSemisterModel,
} from './academicSemester.interface'
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'
import { ApiError } from '../../../errors/ApiError'
import status from 'http-status'

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      enum: academicSemesterTitles,
    },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCode },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
)

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester is Alredy exist')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, academicSemisterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
