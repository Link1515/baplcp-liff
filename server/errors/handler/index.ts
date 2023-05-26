import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { ErrorWithCode } from '../class/ErrorWithCode'
import { prisma } from '~/server/prisma'

export const errorHandler = async (error: unknown) => {
  await prisma.$disconnect()

  if (error instanceof z.ZodError) {
    throw createError({
      statusCode: 400,
      message: error.issues.map((issue) => issue.message).join(' '),
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
