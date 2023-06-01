import { ErrorWithCode } from './class/ErrorWithCode'

export const forbiddenError = (message?: string) =>
  new ErrorWithCode('FORBIDDEN', message ?? 'forbidden', 401)
