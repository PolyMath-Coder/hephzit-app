import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { UtilsModule, UtilsService } from 'lib/utils';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  controllers: [AuthController],
  providers: [AuthService, UtilsService],
})
export class AuthModule {}
