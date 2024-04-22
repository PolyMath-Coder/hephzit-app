import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { RegisterDto } from 'libs/dtos/auth.dto';
import { ErrorResponse } from 'libs/response/error';
import { SuccessResponse } from 'libs/response/success';
import { UtilsService } from 'lib/utils';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';


@Injectable()
export class AuthService {
  constructor( 
  @InjectRepository(User) private readonly userRepo: Repository<User>, 
  private readonly utilService: UtilsService,
  private jwtService: JwtService
) {}

 async validateUser (email: string, password: string)  {
     const user = await this.userRepo.findOneBy({email: email});
    if(!user) {
      return this.utilService.ErrorResponse(404, 'user not found', null, null)
    }

    const compare_password = await bcrypt.compare(password, user.password)
    if(!compare_password) {
      return this.utilService.ErrorResponse(400, 'incorrect password inputted.', null, null)
    }
    return user
  }

  async createUser ({firstName, lastName, email, password}: RegisterDto) {
    const check_user = await this.userRepo.findOneBy({email: email})
   
    if(check_user) {
      return this.utilService.ErrorResponse(400, 'user with email already exists.', null, null);
    }
    const hashed_password = await bcrypt.hash(password, 10)
    const user_payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed_password,
      walletBalance: 0.0

    }

    const data = await this.userRepo.save(user_payload)
    const user_data =  {
      _id: data._id,
      email: email,
      firstName: data.firstName,
      lastName: data.lastName,
      walletBalance: 0
    }

    const token = this.jwtService.sign(JSON.parse(JSON.stringify(user_data)))

    return this.utilService.SuccessResponse(201, 'user creation successful', {...user_data, token: token},  null);

  }

  async comparePassword (email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    console.log(user)
    // const compare_password = await bcrypt.compare(password, user.password)
    // console.log(compare_password)
    // if(!compare_password) {
    //   return this.utilService.ErrorResponse(400, 'password not valid', null, null)
    // }
    // return compare_password;
  }

  async findUserByEmail (email: string) {
    try {
      return await this.userRepo.findOneBy({ email });
    } catch(error) {
      return this.utilService.ErrorResponse(404, 'unable to locate user by ID', null, null)
    }
  }
   
  async getUserById (id: string) {
    try {
      return await this.userRepo.findOneBy({_id: new ObjectId(id)})
    }catch(error) {
      throw new ForbiddenException('unable to retrieve user by ID')
    }
  }

  getHello(): string {
    return 'Hello in this World!';
  }
}
