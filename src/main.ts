import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from './shared/pipes/validation.pipe';
import { ResponseService } from './shared/services/response.service';
import { GlobalExceptionFilter } from './shared/filters/http-exception.filter';
import { ThrottlerGuard } from '@nestjs/throttler';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe());

  const responseService = app.get(ResponseService);
  app.useGlobalFilters(new GlobalExceptionFilter(responseService));

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ThrottlerGuard(reflector));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
