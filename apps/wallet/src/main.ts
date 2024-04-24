import { NestFactory } from '@nestjs/core';
import { WalletModule } from './wallet.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(WalletModule, {
    transport: Transport.GRPC,
    options: {
      package: 'rate',
      protoPath: ''
    }
  });
  await app.listen();
}
bootstrap();
