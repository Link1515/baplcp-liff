import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { sessionConfig } from '~/server/sessionConfig'
import { ErrorWithCode, forbiddenError } from '~/server/errors'

const eventCreateBodySchema = z
  .object({
    name: z.string({
      required_error: 'name is required.',
      invalid_type_error: 'name must be a string.',
    }),
    pricePerActivity: z.number({
      required_error: 'pricePerActivity is required.',
      invalid_type_error: 'pricePerActivity must be a number.',
    }),
    activityStartTime: z
      .string({
        required_error: 'activityStartTime is required.',
        invalid_type_error: 'activityStartTime must be a string.',
      })
      .regex(/^\d{2}:\d{2}$/, { message: 'Format must be hh:mm' }),
    activityEndTime: z
      .string({
        required_error: 'activityEndTime is required.',
        invalid_type_error: 'activityEndTime must be a string.',
      })
      .regex(/^\d{2}:\d{2}$/, { message: 'Format must be hh:mm' }),
    enableSeasonPayment: z
      .boolean({
        invalid_type_error: 'enableSeasonPayment must be a boolean.',
      })
      .default(false),
    pricePerSeason: z
      .number({
        invalid_type_error: 'pricePerSeason must be a number.',
      })
      .optional(),
    activityDates: z
      .number({ required_error: 'activityDates is required.' })
      .array()
      .nonempty({
        message: 'activityDates at least include one date.',
      }),
  })
  .refine(
    ({ enableSeasonPayment, pricePerSeason }) =>
      enableSeasonPayment ? pricePerSeason !== undefined : true,
    { message: 'You must send pricePerSeason when enableSeasonPayment is true' }
  )

type eventCreateBody = z.infer<typeof eventCreateBodySchema>

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()

  try {
    const session = await getSession(event, sessionConfig)
    if (!session.data.isAdmin) throw forbiddenError

    const body = await readBody<eventCreateBody>(event)

    eventCreateBodySchema.parse(body)

    await prisma.season.create({
      data: {
        name: body.name,
        pricePerActivity: body.pricePerActivity,
        activityStartTime: body.activityStartTime,
        activityEndTime: body.activityEndTime,
        enableSeasonPayment: body.enableSeasonPayment,
        pricePerSeason: body.pricePerSeason,
        activity: {
          create: body.activityDates.map((date) => ({ date: new Date(date) })),
        },
      },
    })

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
