import { ErrorWithCode } from './class/ErrorWithCode'

export const forbiddenError = new ErrorWithCode('FORBIDDEN', 'forbidden', 401)
