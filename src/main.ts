import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sockets } from './utils/initSocket';
import { initRedis } from './utils/redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const redis = await initRedis()

  sockets.init({ app , redis })
  await app.listen(3000);
}
bootstrap();
