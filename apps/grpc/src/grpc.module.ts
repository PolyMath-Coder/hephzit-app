import { Module } from '@nestjs/common';
import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [],
  controllers: [GrpcController],
  providers: [GrpcService],
})
export class GrpcModule {
  private setupMicroservice() {
    const microserviceOptions = {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5051',
        package: 'rate',
        protoPath: join(__dirname, './rate.proto')
      }
    }
  }
}
