import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto, req.anonymous);
  }

  @Get('/')
  async getOrders(@Request() req) {
    return this.orderService.getOrders(req.anonymous);
  }
}
