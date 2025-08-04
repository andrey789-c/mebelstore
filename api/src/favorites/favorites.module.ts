import { MiddlewareConsumer, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';
import { AnonymousMiddleware } from 'src/anonymous/anonymous.middleware';

@Module({
  imports: [PrismaModule, AuthModule, JwtModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService],
})
export class FavoritesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser())
      .forRoutes('*')
      .apply(AnonymousMiddleware)
      .forRoutes('*');
  }
}
