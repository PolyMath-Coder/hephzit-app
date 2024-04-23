import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'libs/entities/order.entity';
import { User } from 'libs/entities/user.entity';
import { Transaction } from 'libs/entities/transaction.entity';
import { AuthService } from 'apps/auth/src/auth.service';
import { UtilsService } from 'lib/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Transaction])],
  controllers: [OrdersController],
  providers: [OrdersService, JwtService, UtilsService, AuthService],
})
export class OrdersModule {}
