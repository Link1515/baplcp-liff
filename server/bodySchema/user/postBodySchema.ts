import { z } from 'zod'

export const userPostBodySchema = z.object({
  realName: z.string({
    required_error: 'realName is required.',
    invalid_type_error: 'realName must be a string.',
  }),
  lineId: z.string({
    required_error: 'lineId is required.',
    invalid_type_error: 'lineId must be a string.',
  }),
  name: z.string({
    required_error: 'name is required.',
    invalid_type_error: 'name must be a string.',
  }),
  avatar: z.string({
    required_error: 'avatar is required.',
    invalid_type_error: 'avatar must be a string.',
  }),
  isLineGroupMember: z
    .boolean({
      invalid_type_error: 'isLineGroupMember must be a boolean.',
    })
    .optional(),
  invitedBy: z
    .string({
      invalid_type_error: 'invitedBy must be a boolean.',
    })
    .optional(),
})

export type UserPostBodySchema = z.infer<typeof userPostBodySchema>
