// src/utils/errors/NotFoundError.ts
import { BaseError } from './BaseError'

export class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}
