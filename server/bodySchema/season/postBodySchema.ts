import { z } from 'zod'

export const seasonPostBodySchema = z
  .object({
    name: z
      .string({
        required_error: 'name is required.',
        invalid_type_error: 'name must be a string.',
      })
      .min(1, { message: 'name length must be greater than 1' }),
    pricePerActivity: z.number({
      required_error: 'pricePerActivity is required.',
      invalid_type_error: 'pricePerActivity must be a number.',
    }),
    activityJoinLimit: z
      .number({
        required_error: 'activityJoinLimit is required.',
        invalid_type_error: 'activityJoinLimit must be a string.',
      })
      .gt(1, { message: 'activityJoinLimit must greater than 1' }),
    activityStartTime: z
      .string({
        required_error: 'activityStartTime is required.',
        invalid_type_error: 'activityStartTime must be a string.',
      })
      .regex(/^\d{2}:\d{2}$/, { message: 'Format must be hh:mm' }),
    activityEndTime: z
      .string({
        required_error: 'activityEndTime is required.',
        invalid_type_error: 'activityEndTime must be a string.',
      })
      .regex(/^\d{2}:\d{2}$/, { message: 'Format must be hh:mm' }),
    enableSeasonPayment: z
      .boolean({
        invalid_type_error: 'enableSeasonPayment must be a boolean.',
      })
      .default(false),
    pricePerSeason: z
      .number({
        invalid_type_error: 'pricePerSeason must be a number.',
      })
      .optional(),
    activityDates: z
      .number({ required_error: 'activityDates is required.' })
      .array()
      .nonempty({
        message: 'activityDates at least include one date.',
      }),
  })
  .refine(
    ({ enableSeasonPayment, pricePerSeason }) =>
      enableSeasonPayment ? pricePerSeason !== undefined : true,
    { message: 'You must send pricePerSeason when enableSeasonPayment is true' }
  )

export type SeasonPostBodySchema = z.infer<typeof seasonPostBodySchema>
