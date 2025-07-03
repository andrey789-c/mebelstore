import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { CartService } from 'src/cart/cart.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { TelegramService } from 'src/telegram/telegram.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    JwtModule,
    forwardRef(() => TelegramModule),
  ],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, CartService, JwtService, TelegramService],
  exports: [OrderService]
})
export class OrderModule {}
