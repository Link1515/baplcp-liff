import { z } from 'zod'
import { prisma } from '~/server/prisma'
import { errorHandler } from '~/server/errors'

const updateRecordBodySchema = z.object(
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

type UpdateRecordBodySchema = z.infer<typeof updateRecordBodySchema>

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<UpdateRecordBodySchema>(event)

    updateRecordBodySchema.parse(body)

    await prisma.joinRecordPerActivity.updateMany({
      where: { id: { in: body.recordIds } },
      data: body.data,
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
