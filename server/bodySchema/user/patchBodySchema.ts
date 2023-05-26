import { z } from 'zod'

export const userPatchBodySchema = z.object({
  userId: z.string({
    invalid_type_error: 'userId must be a string.',
    required_error: 'userId is required.',
  }),
  name: z.string({ invalid_type_error: 'name must be a string.' }).optional(),
  avatar: z
    .string({ invalid_type_error: 'avatar must be a string.' })
    .optional(),
})

export type UserPatchBodySchema = z.infer<typeof userPatchBodySchema>
