import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidation } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const route = express.Router()

route.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.cerateAcademicSemesterZodSchema),
  AcademicSemesterController.createSemesterController
)

export const AcademicSemesterRouter = route
