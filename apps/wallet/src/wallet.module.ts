import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtStrategy } from 'apps/auth/src/jwt.strategy';
import { AuthModule } from 'apps/auth/src/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Transaction } from 'libs/entities/transaction.entity';
import { UtilsService } from 'lib/utils';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  controllers: [WalletController],
  providers: [WalletService, WalletService, UtilsService],
})
export class WalletModule {}
