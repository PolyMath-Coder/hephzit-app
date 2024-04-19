import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { UtilsModule, UtilsService } from 'lib/utils';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'hephzit', signOptions: { expiresIn: '60000000000000000s' }}), UtilsModule],
  controllers: [AuthController],
  providers: [AuthService, UtilsService],
})
export class AuthModule {}
