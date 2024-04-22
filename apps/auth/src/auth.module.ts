import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { UtilsModule, UtilsService } from 'lib/utils';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule,  JwtModule.register({secret: 'hephzit', signOptions: { expiresIn: '2d' }}), UtilsModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UtilsService],
})
export class AuthModule {}
