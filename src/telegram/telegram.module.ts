import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';

@Module({
  providers: [TelegramService, TelegramUpdate],
  imports: [
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN || '',
    }),
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
