import { z } from 'zod'
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'

const cerateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.string({
      required_error: 'Year is Required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start months is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End months is required',
    }),
  }),
})
const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is Required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is Required',
        })
        .optional(),
      code: z
        .enum([...academicSemesterCode] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start months is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End months is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided nither',
    }
  )
export const AcademicSemesterValidation = {
  cerateAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
}

// await cerateUserZodSchema.parseAsync(req.body)
