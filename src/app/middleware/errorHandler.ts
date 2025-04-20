import { Request, Response, NextFunction } from 'express'
import { BaseError } from '@/shared/errors/BaseError'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      message: err.message,
    })
    return;
  }

  console.error('Unexpected Error:', err)

  res.status(500).json({
    message: 'Something went wrong',
  })
  return;
}
