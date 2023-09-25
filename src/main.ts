import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log(process.env);
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:8081',
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

  const config = new DocumentBuilder()
    .setTitle('Intranet портал')
    .setDescription('REST API')
    .setVersion('0.0.1')
    .addTag('Evgeny Kan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => console.log(`Server start on ${PORT}`));
}
bootstrap();
