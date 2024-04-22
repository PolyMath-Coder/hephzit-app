import { Controller, Req, Res, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilsService } from 'lib/utils';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from 'libs/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private jwtService: JwtService,
     private utilService: UtilsService,
   

  ) {}

  @Post('register')
  async registerUser( @Body() body: RegisterDto, @Res() res,) {
   const response = await this.authService.createUser(body)
    res.status(response.responseCode).json(response)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req, body: LoginDto) {
    return this.utilService.SuccessResponse(200, 'Login Successful!',  { token: this.jwtService.sign(JSON.parse(JSON.stringify(req.user)))}, null)
    }
}

