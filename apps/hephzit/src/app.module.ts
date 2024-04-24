import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'apps/auth/src/auth.module';
import { WalletModule } from 'apps/wallet/src/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { UtilsModule, UtilsService } from 'lib/utils';
import { LocalStrategy } from 'apps/auth/src/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { OrdersModule } from 'apps/orders/src/orders.module';
import { RedisModule } from 'apps/redis/src/redis.module';

@Module({
  imports: [
    AuthModule,
    WalletModule,
    UtilsModule,
    RedisModule,
    OrdersModule,
    TypeOrmModule.forRoot({type: 'mongodb', url: 'mongodb+srv://infospefind:%40GwXdwLx0vVWQbSFZ@cluster0.ky1upco.mongodb.net/hephzit', useNewUrlParser: true, useUnifiedTopology: true, synchronize: true, autoLoadEntities: true})],
  controllers: [AppController],
  providers: [AppService, UtilsService ],
})
export class AppModule {}
