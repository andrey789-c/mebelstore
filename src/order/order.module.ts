import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { CartService } from 'src/cart/cart.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, JwtModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, CartService, JwtService],
})
export class OrderModule {}
