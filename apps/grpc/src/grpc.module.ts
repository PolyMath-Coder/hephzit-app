import { Module } from '@nestjs/common';
import { GrpcController } from './grpc.controller';
import { GrpcService } from './grpc.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UtilsService } from 'lib/utils';
import * as dotenv from 'dotenv'
dotenv.config()
const GRPC_PORT = process.env.GRPC_SERVER_PORT
@Module({
  imports: [],
  controllers: [GrpcController],
  providers: [GrpcService, UtilsService],
})
export class GrpcModule {

  constructor() {
    this.setupMicroservice();
  }

  private setupMicroservice() {
    const microserviceOptions = {
      transport: Transport.GRPC,
      options: {
        url: GRPC_PORT,
        package: 'rate',
        protoPath: join(__dirname +  './rate.proto')
      }
    }
    const communicationClient = ClientProxyFactory.create
  }
}
