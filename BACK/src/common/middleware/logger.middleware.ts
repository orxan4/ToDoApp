import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction): void {
  const start: number = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.log(`${req.method} ${req.url} ${res.statusCode} - ${req.ip} - ${duration}ms`, 'RequestLog');
  });
  next();
}
