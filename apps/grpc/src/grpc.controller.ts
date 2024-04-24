import { Controller, Get } from '@nestjs/common';
import { GRPCService } from './grpc.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcController {
  constructor(private readonly grpcService: GRPCService) {}

  @GrpcMethod('RateService', 'MessageRequest')
  async fetchRates(data: { message: string} ) {
    const returned_data = await this.grpcService.fetchExchangeRateData()

    return { response: returned_data };


  }
}
