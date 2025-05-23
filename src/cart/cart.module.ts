import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import * as cookieParser from 'cookie-parser';
import { JwtModule } from '@nestjs/jwt';
import { AnonymousMiddleware } from 'src/anonymous/anonymous.middleware';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [AuthModule, JwtModule, PrismaModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],

})
export class CartModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*').apply(AnonymousMiddleware).forRoutes('*');
  }
}
