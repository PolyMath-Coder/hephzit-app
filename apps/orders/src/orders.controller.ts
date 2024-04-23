import { Controller, Req, Body, Get, Res, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'apps/auth/src/jwt-auth.guard';
import { OrderDto } from 'libs/dtos/order.dto';

@Controller('order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('place-order')
  async placeOrder(@Req() req, @Body() body: OrderDto, @Res()res) {
    const response = await this.ordersService.placeOrder(req.user._id, body)
    res.status(response.responseCode).json(response)
  }

  
}
