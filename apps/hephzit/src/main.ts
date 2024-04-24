import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname } from 'path';
import { Logger } from '@nestjs/common';
//import { Logger } from 'winston';
import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/')

  const logger = new Logger("bootstrap")
  await app.listen(PORT, () => {
    logger.log(`Server now live at port ${PORT}...`)
  });
}
bootstrap();
