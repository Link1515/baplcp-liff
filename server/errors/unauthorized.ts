import { ErrorWithCode } from './class/ErrorWithCode'

export const unauthorizedError = (message: string) =>
  new ErrorWithCode('Unauthorized', message, 401)
