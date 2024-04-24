import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'apps/auth/src/auth.service';
import { UtilsService } from 'lib/utils';
import { InAppWalletTransactionDto, WalletTransactionDto } from 'libs/dtos/wallet.dto';
import { Transaction } from 'libs/entities/transaction.entity';
import { User } from 'libs/entities/user.entity';
import { TransactionTypeEnum } from 'libs/enums/enums';
import { ObjectId } from 'mongodb';

import {  Repository } from 'typeorm';
import axios from 'axios'
import { GrpcService } from 'apps/grpc/src/grpc.service';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class WalletService {
  private grpcClient: GrpcService
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, 
  private readonly client: ClientGrpc,
  private readonly authService: AuthService,
  private readonly utilService: UtilsService,
  @InjectRepository(Transaction) private readonly transactionRepo: Repository<Transaction>){}

  async requestForexRate () {
    const reply = await this.grpcClient.fetchExchangeRateData();
    return reply
  }

  async walletBalanceCheck (id: string) {
    
   const {firstName, lastName, walletBalance } = await this.userRepo.findOneBy({_id: new ObjectId(id)})
   const user_data = {
    fullName: `${firstName} ${lastName}`,
    walletBalance: walletBalance,
   }
   return this.utilService.SuccessResponse(200, `wallet balance for ${user_data.fullName} now retrieved...`, user_data, null)
  }

  async debitTransaction (userId: string, {amount, description, transaction_type}: InAppWalletTransactionDto) {
    try {
      const user = await this.userRepo.findOneBy({_id: new ObjectId(userId)})
  
      if(user.walletBalance == 0) {
        return await this.utilService.ErrorResponse(400, 'no funds available for transaction occurrence...', null, null)
      }
      if(user.walletBalance < amount) {
        return await this.utilService.ErrorResponse(400, 'insufficient funds for debit transaction', null, null)
      }
      await this.transactionRepo.save({userId: new ObjectId(userId), amount: amount, description: description, transaction_type: transaction_type })
      
      Object.assign(user, {walletBalance: user.walletBalance - amount})
    
     await this.userRepo.save(user)
  
     return this.utilService.SuccessResponse(200, 'Debit Transaction Successful!', null, null)
    } catch(error) {
      return this.utilService.ErrorResponse(400, 'unable to perform debit transaction', null, null)
    }
   
  }

  async creditTransaction (userId: string, data: WalletTransactionDto) {
    try {
      const user = await this.authService.getUserById(data.user_id)
      if(!user){
        return this.utilService.ErrorResponse(400, 'Oops! beneficiary not found...', null, null)
      }
  
      const user_to_debit = await this.authService.getUserById(userId)
      if(user_to_debit.walletBalance < data.amount) {
        return this.utilService.ErrorResponse(400, 'insufficients funds for transaction', null, null)
      }
  
      user_to_debit.walletBalance = user_to_debit.walletBalance - data.amount
  
      await this.userRepo.save(user_to_debit)
      await this.transactionRepo.save({userId: data.user_id, transaction_type: TransactionTypeEnum.DEBIT, amount: data.amount, description: data.description })
      
      user.walletBalance = user.walletBalance + data.amount
  
      await this.userRepo.save(user)
  
      await this.transactionRepo.save({userId: data.user_id, transaction_type: TransactionTypeEnum.CREDIT, amount: data.amount, description: data.description });
      
      return this.utilService.SuccessResponse(200, 'transaction request successful!', null, null)
    } catch(error) {
      return this.utilService.ErrorResponse(400, 'unable to perform credit transaction', null, null)
    }
  
  }

  async viewTransactionHistory(userId: ObjectId) {
   const transaction_log = await this.transactionRepo.find({ where: { userId: userId }, select: ["_id", "amount", "description", "transaction_type"] })
   if(transaction_log.length === 0) {
    return this.utilService.ErrorResponse(404, 'no transaction yet performed by user...', null, null)
   };
   return this.utilService.SuccessResponse(200, 'all user transactions now retrieved...', transaction_log, null)
  
  }
}
