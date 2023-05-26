import { z } from 'zod'

export const activityRecordPatchBodySchema = z.object(
  {
    recordIds: z
      .string({
        required_error: 'recordIds is required.',
        invalid_type_error: 'recordId must be a string array.',
      })
      .array()
      .nonempty({ message: 'recordIds cannot be empty.' }),
    data: z.object(
      {
        active: z
          .boolean({ invalid_type_error: 'data.active must be a boolean.' })
          .optional(),
        hasPaid: z
          .boolean({ invalid_type_error: 'data.hasPaid must be a boolean.' })
          .optional(),
      },
      { required_error: 'data is required' }
    ),
  },
  { required_error: 'JSON body is required' }
)

export type ActivityRecordPatchBodySchema = z.infer<
  typeof activityRecordPatchBodySchema
>
