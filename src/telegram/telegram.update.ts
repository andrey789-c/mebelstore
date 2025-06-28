import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class TelegramUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    const chatId = ctx.from?.id;
    await ctx.reply(`👋 Привет! Твой chat_id: ${chatId}`);
    // Можешь сохранить chatId в БД
    console.log('Пользователь начал:', chatId);
  }
}
