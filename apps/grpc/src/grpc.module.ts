import { Module } from '@nestjs/common';
import { GrpcController } from './grpc.controller';
import { GRPCService } from './grpc.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UtilsService } from 'lib/utils';
import * as dotenv from 'dotenv'
import { WalletModule } from 'apps/wallet/src/wallet.module';
dotenv.config()
const GRPC_PORT = process.env.GRPC_SERVER_PORT
@Module({
  imports: [],
  controllers: [GrpcController],
  providers: [GRPCService, UtilsService],
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
