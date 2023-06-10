import { z } from 'zod'

const cerateUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required true',
    }),
    password: z.string().optional(),
  }),
})
export const UserValidation = {
  cerateUserZodSchema,
}

// await cerateUserZodSchema.parseAsync(req.body)
