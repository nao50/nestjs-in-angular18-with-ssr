import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('view engine', 'html');
  app.set('views', './angular-frontend/dist/angular-frontend/browser');

  await app.listen(3000);
}
bootstrap();
