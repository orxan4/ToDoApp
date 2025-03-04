import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { json, urlencoded, Request, Response } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '2mb' }));
  app.use(urlencoded({ extended: true, limit: '2mb' }));

  app.use((req: Request, res: Response, next: any): void => {
    const start: number = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      Logger.log(`${req.method} ${req.url} ${res.statusCode} - ${req.ip} - ${duration}ms`, 'RequestLog');
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    next();
  });

  app.enableCors({
    origin: ['http://localhost:4200', 'http://192.168.0.100:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => console.log(`Listening on port ${port}`));
}
bootstrap();
