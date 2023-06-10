import express from 'express'
import { UserRouter } from '../modules/users/user.route'
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route'

const router = express.Router()
const moduleRoutes = [
  {
    path: '/user/',
    route: UserRouter,
  },

  {
    path: '/academic-semester/',
    route: AcademicSemesterRouter,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
