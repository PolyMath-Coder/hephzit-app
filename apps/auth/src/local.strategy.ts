import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport'
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UtilsService } from 'lib/utils';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, private utilService: UtilsService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<any> {
       const user = await this.authService.validateUser(email, password)
       if(!user) {
        return this.utilService.ErrorResponse(404, 'unregistered email or incorrect password inputted', null, null)
       }
       return user;
    }
}