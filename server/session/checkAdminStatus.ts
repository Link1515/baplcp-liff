import { forbiddenError, badRequestError } from '../errors'
import { sessionConfig } from './config'

export const checkAdminStatus = async (
  event: Parameters<typeof getSession>[0]
) => {
  const session = await getSession(event, sessionConfig)
  if (!session.data.user)
    throw badRequestError('Cannot get user status from Session cookie')
  if (!session.data.user.isAdmin) throw forbiddenError()
}
