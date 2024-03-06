import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // HTTP 요청 필터링

  // Swagger 설정, 문서 생성
  const config = new DocumentBuilder()
    .setTitle('휴대폰 인증 API')
    .setDescription('휴대폰 인증 API 문서입니다.')
    .setVersion('1.0')
    .build();

  // API 문서 경로 지정
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
