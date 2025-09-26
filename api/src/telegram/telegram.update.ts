import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { TelegramService } from './telegram.service';
import { OrderService } from 'src/order/order.service';

@Update()
export class TelegramUpdate {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly orderService: OrderService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const chatId = ctx.from?.id;
    await ctx.reply(`👋 Привет! Твой chat_id: ${chatId}`);
    // Можешь сохранить chatId в БД
    console.log('Пользователь начал:', chatId);
  }

  @Command('update')
  async onUpdate(@Ctx() ctx: Context) {
    if (ctx.from?.id.toString() === process.env.ADMIN_ID) {
      ctx.reply(`Good! Введи id заказа!)`);
      this.telegramService.setWaitingForOrderId(ctx.from?.id || 0);
    } else {
      ctx.reply('Ты не админ)');
    }
  }
  @Command('orders') 
  async getOrders(@Ctx() ctx: Context) {
    const chatId = ctx.from?.id;
    if (chatId?.toString() === process.env.ADMIN_ID) {
      console.log('aaa')
      await this.orderService.getOrdersForAdminAndSendToTg()
    } else {
      return ctx.reply('Ты не админ!')
    }
  }

  @On('text') 
  async updateOrder(@Ctx() ctx: Context) {
    const chatId = ctx.from?.id;
    const text = ctx.text;

    if (!chatId || !text) return;

    if (this.telegramService.isWaitingForOrderId(chatId)) {
      const orderId = parseInt(text);
      if (isNaN(orderId)) {
        ctx.reply('❌ Введите корректный числовой ID заказа');
      } else {
        this.telegramService.setOrderId(chatId, orderId);

        await ctx.reply(
          'Выберите новый статус заказа:',
          Markup.inlineKeyboard([
            [Markup.button.callback('Принят', 'status:PROCESSING')],
            [Markup.button.callback('Подтвержден', 'status:CONFIRMED')],
            [Markup.button.callback('В пути', 'status:SHIPPING')],
            [Markup.button.callback('Доставлен', 'status:DELIVERED')],
            [Markup.button.callback('Отменен', 'status:CANCELED')],
          ]),
        );
      }
    }
  }

  


  @Action(/status:.+/)
  async onComandUpdateStatus(@Ctx() ctx:Context) {
    const chatId = ctx.from?.id;
    const status = ctx.callbackQuery?.['data'].split(':')[1];

    if(!chatId || !status) return {success: false, message: 'Статус не найден или айди чата'}
    const orderId = this.telegramService.getOrderId(chatId)

    if(!orderId) return {success: false, message: 'Заказ не найден'}

    await this.orderService.updateOrderStatus({status}, orderId?.toString())

    ctx.reply('Статус обновился!')
  }
}
