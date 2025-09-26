import { forwardRef, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { OrderService } from 'src/order/order.service';
import { OrderModule } from 'src/order/order.module';

@Module({
  providers: [TelegramService, TelegramUpdate],
  imports: [
    forwardRef(() => OrderModule),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN || '',
    }),
    
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
