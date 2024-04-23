import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'apps/auth/src/auth.service';
import { UtilsService } from 'lib/utils';
import { OrderDto } from 'libs/dtos/order.dto';
import { Order } from 'libs/entities/order.entity';
import { User } from 'libs/entities/user.entity';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  @InjectRepository(User) private readonly userRepo: Repository<User>,
  private readonly authService: AuthService,
  private readonly utilService: UtilsService
) {}
  
  async placeOrder (userId: string, data: OrderDto) {
    try {
      const user =  await this.authService.getUserById(userId);
    if(!user) {
      return this.utilService.ErrorResponse(404, 'user not found', null, null)
    }

    if(user.walletBalance < data.amount) {
      return this.utilService.ErrorResponse(400, 'Ooopss! Insufficient funds to process order...', null, null)
    }

    user.walletBalance = user.walletBalance - data.amount
    await this.userRepo.save(user)

    const order_payload = {
      userId: new ObjectId(userId),
      pair: data.pair,
      type: data.type,
      amount: data.amount,
      price: data.price
    }
    const order = await this.orderRepo.save(order_payload)
    return this.utilService.SuccessResponse(201, 'Order processed successfully...', order, null)
    } catch(error) {
      return this.utilService.ErrorResponse(400, 'unable to place orders successfully', null, null)
    }
    
  }
}
