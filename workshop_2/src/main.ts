import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidUnknownValues: true,
  }));

  const config = new DocumentBuilder().setTitle("Workshop company management app")
  .setDescription("Employee and departments management app")
  .setVersion("1.0")
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("swagger", app, document);
  await app.listen(3000);
}
bootstrap();
