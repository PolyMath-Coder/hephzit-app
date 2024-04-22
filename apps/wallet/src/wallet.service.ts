import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsService } from 'lib/utils';
import { WalletTransactionDto } from 'libs/dtos/wallet.dto';
import { Transaction } from 'libs/entities/transaction.entity';
import { User } from 'libs/entities/user.entity';
import { MongoDBNamespace, ObjectId } from 'mongodb';
import {  Repository } from 'typeorm';

@Injectable()
export class WalletService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, 
  private readonly utilService: UtilsService,
  @InjectRepository(Transaction) private readonly transactionRepo: Repository<Transaction>){}
  async walletBalance (email: string) {
   const user = await this.userRepo.findOneBy({email: email})
   return
  }

  async debitTransaction (userId, {amount, description, transaction_type}: WalletTransactionDto) {
    const user = await this.userRepo.findOneBy({_id: new ObjectId(userId)})
  
    if(user.walletBalance == 0) {
      return await this.utilService.ErrorResponse(400, 'no funds available to perform transaction', null, null)
    }
    if(user.walletBalance < amount) {
      return await this.utilService.ErrorResponse(400, 'insufficient funds to perform transaction', null, null)
    }
    await this.transactionRepo.save({userId: new ObjectId(userId), amount: amount, description: description, transaction_type: transaction_type })
    
    Object.assign(user, {walletBalance: user.walletBalance - amount})
  
   await this.userRepo.save(user)

   return this.utilService.SuccessResponse(200, 'Debit Transaction Successful!', null, null)
  }
}
