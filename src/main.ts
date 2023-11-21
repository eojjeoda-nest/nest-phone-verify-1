import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('휴대폰 인증 API')
    .setDescription('휴대폰 인증 API 설명서')
    .setVersion('1.0')
    .build()
  // TODO: 프로그램 구현

  const swagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swagger);

  await app.listen(process.env.PORT || 8000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
