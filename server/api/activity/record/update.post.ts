import { z } from 'zod'
import { prisma } from '~/server/prisma'
import { ErrorWithCode } from '~/server/errors'
import { Prisma } from '@prisma/client'

const removeRecordBodySchema = z.object(
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

type RemoveRecordBodySchema = z.infer<typeof removeRecordBodySchema>

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<RemoveRecordBodySchema>(event)

    removeRecordBodySchema.parse(body)

    await prisma.joinRecordPerActivity.updateMany({
      where: { id: { in: body.recordIds } },
      data: body.data,
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    console.log(error)
    await prisma.$disconnect()

    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: error.issues.map((issue) => issue.message).join(' '),
      })
    } else if (error instanceof ErrorWithCode) {
      throw createError({
        statusCode: error.code,
        statusMessage: error.message,
      })
    } else if (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientValidationError
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
