import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/error/http-exception.filter';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  // ---------------------------- Global Pipe 설정 ----------------------------
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // ---------------------------- Global Filter 설정 ----------------------------
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 8000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
