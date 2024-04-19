import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class WalletService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}
  async walletBalance (email: string) {
   const user = await this.userRepo.findOneBy({email: email})
   return
  }
}
