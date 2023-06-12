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
route.get('/:id', AcademicSemesterController.getSingleSemesterController)
route.get('/', AcademicSemesterController.getAllSemestersController)
route.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemesterController
)

export const AcademicSemesterRouter = route
