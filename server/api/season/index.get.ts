import { prisma } from '~/server/prisma'

export default defineEventHandler(async (event) => {
  try {
    const seasonList = await prisma.season.findMany()
    await prisma.$disconnect()

    return seasonList
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
    })
  }
})
