import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { JwtStrategy } from 'apps/auth/src/jwt.strategy';
import { AuthModule } from 'apps/auth/src/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
