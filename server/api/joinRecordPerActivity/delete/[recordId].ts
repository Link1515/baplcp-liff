import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  try {
    const recordId = event.context.params?.recordId as string

    await prisma.joinRecordPerActivity.update({
      where: { id: recordId },
      data: { active: false },
    })

    await prisma.$disconnect()

    return {}
  } catch (error) {
    await prisma.$disconnect()

    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
