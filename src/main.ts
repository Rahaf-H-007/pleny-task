import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const swagger = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Pleny Task Restaurant API')
    .setDescription(
      'This is the swagger docuemtnation for the first part of the task provided by Pleny',
    )
    .addServer('http://localhost:3000')
    .build();
  const documentation = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, documentation);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
