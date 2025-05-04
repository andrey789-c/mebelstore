import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { AnonymousMiddleware } from './anonymous/anonymous.middleware';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [ProductModule, PrismaModule, CategoryModule, CartModule, AuthModule, ],
})
export class AppModule {}
