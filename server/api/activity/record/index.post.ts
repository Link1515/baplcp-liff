import { z } from 'zod'
import { compareAsc, format } from 'date-fns'
import { prisma } from '~/server/prisma'
import { errorHandler, notFoundError, badRequestError } from '~/server/errors'

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
      where: { id: body.userId },
    })
    if (!user) throw notFoundError('User not found')

    const activity = await prisma.activity.findUnique({
      where: {
        id: body.activityId,
      },
    })
    if (!activity) throw notFoundError('Activity not found')

    if (!user.isAdmin) {
      if (compareAsc(new Date(activity.allowedJoinDate), new Date()) > 0) {
        throw badRequestError(
          `The activity will allow join at ${format(
            new Date(activity.allowedJoinDate),
            'yyyy/MM/dd (ccc.) kk:mm'
          )}`
        )
      }

      if (compareAsc(new Date(), new Date(activity.joinDeadline)) > 0) {
        throw badRequestError(`The activity has ended`)
      }
    }

    const record = await prisma.joinRecordPerActivity.findFirst({
      where: {
        userId: body.userId,
        activityId: body.activityId,
      },
    })

    record
      ? await prisma.joinRecordPerActivity.update({
          where: { id: record.id },
          data: { active: true, joinedAt: new Date() },
        })
      : await prisma.joinRecordPerActivity.create({
          data: { ...body, joinedAt: new Date() },
        })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await errorHandler(error)
  }
})
