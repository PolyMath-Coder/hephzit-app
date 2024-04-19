import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'apps/auth/src/auth.module';
import { WalletModule } from 'apps/wallet/src/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { UtilsModule, UtilsService } from 'lib/utils';

@Module({
  imports: [
    AuthModule, 
    WalletModule,
    UtilsModule,
    TypeOrmModule.forRoot({type: 'mongodb', url: 'mongodb+srv://infospefind:%40GwXdwLx0vVWQbSFZ@cluster0.ky1upco.mongodb.net/hephzit', useNewUrlParser: true, useUnifiedTopology: true, synchronize: true, autoLoadEntities: true})],
  controllers: [AppController],
  providers: [AppService, UtilsService ],
})
export class AppModule {}