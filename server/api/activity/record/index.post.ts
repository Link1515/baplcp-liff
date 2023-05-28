import { compareAsc, format } from 'date-fns'
import { prisma } from '~/server/prisma'
import { errorHandler, notFoundError, badRequestError } from '~/server/errors'
import {
  activityRecordPostBodySchema,
  ActivityRecordPostBodySchema,
} from '~/server/bodySchema'
import { userService, activityService } from '~/server/services'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<ActivityRecordPostBodySchema>(event)

    activityRecordPostBodySchema.parse(body)

    const user = await userService.findById({ id: body.userId })
    if (!user) throw notFoundError('User not found')

    const activity = await activityService.findById({ id: body.activityId })
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
