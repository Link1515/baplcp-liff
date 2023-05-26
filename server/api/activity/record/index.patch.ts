import { prisma } from '~/server/prisma'
import { errorHandler } from '~/server/errors'
import {
  activityRecordPatchBodySchema,
  ActivityRecordPatchBodySchema,
} from '~/server/bodySchema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<ActivityRecordPatchBodySchema>(event)

    activityRecordPatchBodySchema.parse(body)

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
