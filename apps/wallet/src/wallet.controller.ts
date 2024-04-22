import { Controller, Req, Res, Post, Get, UseGuards, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'apps/auth/src/jwt-auth.guard';
import { WalletTransactionDto } from 'libs/dtos/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('check-balance')
  @UseGuards(JwtAuthGuard)
  async walletBalance(@Req() req) {
    return await this.walletService.walletBalance(req.user.email)
  }

  @UseGuards(JwtAuthGuard)
  @Post('debit')
  async creditBalance(@Req() req, @Body() body: WalletTransactionDto) {
  console.log(req.user)
  return await this.walletService.debitTransaction(req.user.id, body)
  }
}
