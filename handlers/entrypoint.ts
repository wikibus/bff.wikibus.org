import { NextFunction, Request, Response } from 'express'

export function get (req: Request, res: Response, next: NextFunction) {
  res.status(200)
  next()
}
