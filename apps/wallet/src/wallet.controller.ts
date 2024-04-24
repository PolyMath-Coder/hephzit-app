import { Controller, Req, Res, Post, Get, UseGuards, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'apps/auth/src/jwt-auth.guard';
import { InAppWalletTransactionDto, WalletTransactionDto } from 'libs/dtos/wallet.dto';

@UseGuards(JwtAuthGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  
  @Get('check-balance')
  async walletBalance(@Req() req) {
    return await this.walletService.walletBalanceCheck(req.user._id)
  }

  @Post('debit')
  async debitTransaction(@Req() req, @Body() body: InAppWalletTransactionDto, @Res() res) {
  const data = await this.walletService.debitTransaction(req.user._id, body)
  res.status(data.responseCode).json(data)
}

  
  @Post('credit')
  async creditTransaction(@Req() req, @Body()body: WalletTransactionDto, @Res() res ) {
   const data = await this.walletService.creditTransaction(req.user._id, body)
   res.status(data.responseCode).json(data)
  }

  @Get('transaction-history')
  async viewTransactionHistory(@Req() req, @Res() res) {
    const data = await this.walletService.viewTransactionHistory(req.user._id)
    res.status(data.responseCode).json(data)
  }
}
