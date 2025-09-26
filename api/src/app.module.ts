import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { OrderModule } from './order/order.module';
import { TelegramService } from './telegram/telegram.service';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ProductModule,
    PrismaModule,
    CategoryModule,
    CartModule,
    AuthModule,
    FavoritesModule,
    OrderModule,
    TelegramModule,
  ],
  providers: [TelegramService],
  exports: []
})
export class AppModule {}
