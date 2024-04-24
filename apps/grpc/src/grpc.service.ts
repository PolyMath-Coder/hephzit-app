import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { UtilsService } from 'lib/utils';
import * as dotenv from 'dotenv'
dotenv.config()
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY

@Injectable()
export class GRPCService {
  constructor( private readonly utilService: UtilsService) {
   
  }
  async fetchExchangeRateData() {
    try {

  const axiosResponse = await axios.get(`https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`)
  return JSON.stringify(axiosResponse.data.conversion_rates)
    
} catch(error) {
      return this.utilService.ErrorResponse(400, 'unable to fetch conversion rates', null, null)
    }
  }
  
}
