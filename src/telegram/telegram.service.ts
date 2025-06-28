import { Injectable } from '@nestjs/common';
import { Ctx, InjectBot, Start } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {

  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async sendMessageToUser(id: number | string, message: string) {
    try {
      await this.bot.telegram.sendMessage(id, message, {
        parse_mode: 'HTML'
      })
    } catch (e) {
      console.log('Ошибка при отправке сообщения ', e)
    }
  }

  // @Start()
  // async onStart(@Ctx() ctx: Context) {
  //   const chatId = ctx.from?.id;
  //   await ctx.reply(`👋 Привет! Твой chat_id: ${chatId}`);
  //   // Можешь сохранить chatId в БД
  //   console.log('Пользователь начал:', chatId);
  // }

}
