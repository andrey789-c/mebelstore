import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [ProductModule, PrismaModule, CategoryModule, CartModule, AuthModule, FavoritesModule, ],
})
export class AppModule {}
