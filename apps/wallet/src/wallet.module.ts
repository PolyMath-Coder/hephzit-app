import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtStrategy } from 'apps/auth/src/jwt.strategy';
import { AuthModule } from 'apps/auth/src/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Transaction } from 'libs/entities/transaction.entity';
import { UtilsService } from 'lib/utils';
import { AuthService } from 'apps/auth/src/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Transaction])],
  controllers: [WalletController],
  providers: [WalletService, JwtService, AuthService, UtilsService],
})
export class WalletModule {}
