import { z } from 'zod'

export const activityRecordPostBodySchema = z.object({
  userId: z
    .string({
      required_error: 'userId is required.',
      invalid_type_error: 'userId must be a string.',
    })
    .min(24, { message: 'userId length must be 24' })
    .max(24, { message: 'userId length must be 24' }),
  activityId: z
    .string({
      required_error: 'activityId is required.',
      invalid_type_error: 'activityId must be a string.',
    })
    .min(24, { message: 'activityId length must be 24' })
    .max(24, { message: 'activityId length must be 24' }),
})

export type ActivityRecordPostBodySchema = z.infer<
  typeof activityRecordPostBodySchema
>
