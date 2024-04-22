import { Controller, Req, Res, Post, Get, UseGuards, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'apps/auth/src/jwt-auth.guard';
import { InAppWalletTransactionDto, WalletTransactionDto } from 'libs/dtos/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get('check-balance')
  async walletBalance(@Req() req) {
    // console.log(req.user)
    return await this.walletService.walletBalanceCheck(req.user._id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('debit')
  async debitTransaction(@Req() req, @Body() body: InAppWalletTransactionDto, @Res() res) {
  const data = await this.walletService.debitTransaction(req.user._id, body)
  res.status(data.responseCode).json(data)
}

  @UseGuards(JwtAuthGuard)
  @Post('credit')
  async creditTransaction(@Req() req, @Body()body: WalletTransactionDto, @Res() res ) {
    await this.walletService.creditTransaction(req.user._id, body)
  }
}
