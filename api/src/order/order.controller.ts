import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order-status.dto';

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

  @Get('/:id')
  async getOrder(@Request() req, @Param('id') id: string) {
    return this.orderService.getOrder(req.anonymous, +id);
  }

  @Post('/update')
  async updateStatusOrder(
    @Request() req,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {}
}
