import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // разрешаем запросы с фронта
    credentials: true, // для работы с cookies
  });
  const candidates = [
    join(__dirname, '..', 'public'),           // когда запущен dist (api/dist/public)
    join(process.cwd(), 'api', 'public'),      // запуск из корня проекта
    join(process.cwd(), 'public'),             // на случай иного cwd
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) {
      app.useStaticAssets(dir);
      break;
    }
  }
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
