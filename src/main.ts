import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule)
  // TODO: 프로그램 구현
  app.useGlobalPipes(new ValidationPipe({}))

  const config = new DocumentBuilder()
    .setTitle('JongHoon API')
    .setDescription('Phone Certifications API description')
    .setVersion('1.0')
    .addTag('phone-certifications')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 8000)

  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
