import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { RegisterDto } from 'libs/dtos/auth.dto';
import { ErrorResponse } from 'libs/response/error';
import { SuccessResponse } from 'libs/response/success';
import { UtilsService } from 'lib/utils';


@Injectable()
export class AuthService {
  constructor( @InjectRepository(User) private readonly userRepo: Repository<User>, 
private readonly utilService: UtilsService) {}

  async createUser ({firstName, lastName, email, password}:RegisterDto) {
    const check_user = await this.userRepo.findOneBy({email: email})
   
    if(check_user) {
      return this.utilService.ErrorResponse(400, 'user with email already exists', null, null);
    }
    const hashed_password = await bcrypt.hash(password, 10)
    const user_payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed_password
    }

    const data = await this.userRepo.save(user_payload)

    return this.utilService.SuccessResponse(201, 'user creation successful', data, null);

  }


  getHello(): string {
    return 'Hello in this World!';
  }
}
