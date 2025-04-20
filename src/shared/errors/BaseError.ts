// src/utils/errors/BaseError.ts
export class BaseError extends Error {
    public statusCode: number
    public isOperational: boolean
  
    constructor(message: string, statusCode: number = 400, isOperational = true) {
      super(message)
      this.statusCode = statusCode
      this.isOperational = isOperational
      Error.captureStackTrace(this, this.constructor)
    }
  }
  