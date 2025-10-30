import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Test Backend API')
    .setDescription('API para dashboard de transações')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'authorization')
    .build();

  const document = SwaggerModule.createDocument(app as any, config as any);
  SwaggerModule.setup('api/docs', app as any, document as any);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
