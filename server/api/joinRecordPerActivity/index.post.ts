import { z } from 'zod'
import { compareAsc, format } from 'date-fns'
import { prisma } from '~/server/prisma'
import { ErrorWithCode, notFoundError, badRequestError } from '~/server/errors'

const joinRecordPerActivityCreateBodySchema = z.object({
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

type JoinRecordPerActivityCreateBody = z.infer<
  typeof joinRecordPerActivityCreateBodySchema
>

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<JoinRecordPerActivityCreateBody>(event)

    joinRecordPerActivityCreateBodySchema.parse(body)

    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    })
    if (!user) throw notFoundError('User not found')

    const activity = await prisma.activity.findUnique({
      where: {
        id: body.activityId,
      },
    })
    if (!activity) throw notFoundError('Activity not found')

    if (compareAsc(new Date(activity.allowedJoinDate), new Date()) > 0) {
      throw badRequestError(
        `The activity will allow join at ${format(
          new Date(activity.allowedJoinDate),
          'yyyy/MM/dd (ccc.) kk:mm'
        )}`
      )
    }

    const record = await prisma.joinRecordPerActivity.findFirst({
      where: {
        userId: body.userId,
        activityId: body.activityId,
        active: false,
      },
    })

    record
      ? await prisma.joinRecordPerActivity.update({
          where: { id: record.id },
          data: { active: true },
        })
      : await prisma.joinRecordPerActivity.create({ data: body })

    await prisma.$disconnect()

    return {}
  } catch (error) {
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
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
