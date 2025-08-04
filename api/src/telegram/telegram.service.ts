import { Injectable } from '@nestjs/common';
import { Ctx, InjectBot, Start } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {

  constructor(@InjectBot() private readonly bot: Telegraf) {}

  private userStates = new Map<number, 'waiting_order_id' | null>();
  private pendingOrders = new Map<number, number>();

  async sendMessageToUser(id: number | string, message: string) {
    try {
      await this.bot.telegram.sendMessage(id, message, {
        parse_mode: 'HTML'
      })
    } catch (e) {
      console.log('Ошибка при отправке сообщения ', e)
    }
  }

  setWaitingForOrderId(chatId: number) {
    this.userStates.set(chatId, 'waiting_order_id');
  }

  isWaitingForOrderId(chatId: number) {
    return this.userStates.get(chatId) === 'waiting_order_id';
  }

  setOrderId(chatId: number, orderId: number) {
    this.pendingOrders.set(chatId, orderId);
    this.userStates.set(chatId, null);
  }

  getOrderId(chatId: number): number | undefined {
    return this.pendingOrders.get(chatId);
  }

  clearState(chatId: number) {
    this.userStates.delete(chatId);
    this.pendingOrders.delete(chatId);
  }

}
