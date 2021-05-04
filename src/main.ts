import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { DataInterceptor } from './interceptor/data.interceptor';
import { AllExceptionFilter } from './filter/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(logger); // 引入日志中间件
  app.useGlobalInterceptors(new TransformInterceptor()); // 日志记录
  app.useGlobalInterceptors(new DataInterceptor()); // 返回值规范化
  app.useGlobalFilters(new AllExceptionFilter()); // 引入异常过滤器
  await app.listen(3000);
}
bootstrap();