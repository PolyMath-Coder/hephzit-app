import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'apps/auth/src/jwt-auth.guard';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('check-balance')
  @UseGuards(JwtAuthGuard)
  async getHello(@Req() req) {
    console.log(req.user)
    return await this.walletService.walletBalance(req.user.email)
  }
}
