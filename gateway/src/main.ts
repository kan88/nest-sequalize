import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(process.env);
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
      'HEAD',
    ],
    allowedHeaders:
      'Content-Type, WWW-Authenticate, Authorization, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Expose-Headers',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Intranet портал')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('Evgeny Kan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => console.log(`Server start on ${PORT}`));
}
bootstrap();
