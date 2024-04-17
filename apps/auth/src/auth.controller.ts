import { Controller, Req, Res, Body, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { response } from 'express';
import { UtilsService } from 'lib/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private utilService: UtilsService

  ) {}

  @Post('register')
  async registerUser( @Body() body, @Res() res,) {
   const response = await this.authService.createUser(body)
   // console.log(response)
    res.status(201).json(response)
  }

  @Get('love')
  getHello(): string {
    return this.authService.getHello();
  }
}
