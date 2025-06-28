import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { TelegramService } from 'src/telegram/telegram.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private JWTService: JwtService,
    private telegramService: TelegramService,
  ) {}

  private getAnonymousId(token: string): string | null {
    try {
      const payload = this.JWTService.verify(token, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      return payload.anonymousId;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async createOrder(body: CreateOrderDto, token: string) {
    const { name, phone, city, home, street, flat } = body;

    const cart = await this.cartService.getCart(token);
    const anonymousId = this.getAnonymousId(token);

    if (!anonymousId) return { success: false, message: 'Вы не авторизованы' };
    
    if (!Array.isArray(cart) && cart.cart && cart.cart.length > 0) {
      await this.prisma.order.create({
        data: {
          anonymousId,
          name,
          phone,
          address: `${city} - ${home} ${street}`,
          flat,
          products: {
            connect: cart.cart.map((product) => ({
              id: product.id,
            })),
          },
        },
      });

      const productList = cart.cart
        .map((p, i) => `${i + 1}. ${p.name} — ${p.quantity} шт.`)
        .join('\n');

      const tgMessage = `
        <b>🛒 Новый заказ</b>

        👤 Имя: ${name}
        📞 Телефон: ${phone}
        🏠 Адрес: ${city}, ${street} ${home}${flat ? `, кв. ${flat}` : ''}
        📦 Товаров: ${cart.cart.length}

        <b>Список товаров:</b>
        ${productList}
      `;

      await this.telegramService.sendMessageToUser(
        process.env.ADMIN_ID || '',
        tgMessage,
      );

      await this.cartService.clearCart(token);

      

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: 'Пустая корзина',
      };
    }
  }

  async getOrders(token: string) {
    const anonymousId = this.getAnonymousId(token);

    if (!anonymousId) return { success: false, message: 'Вы не авторизованы' };

    return await this.prisma.order.findMany({
      where: { anonymousId },
      include: {
        products: true,
      },
    });
  }

  async getOrder(token: string, id: string) {
    const anonymousId = this.getAnonymousId(token);

    if (!anonymousId) return { success: false, message: 'Вы не авторизованы' };

    return await this.prisma.order.findUnique({
      where: {
        anonymousId,
        id,
      },
      include: {
        products: true,
      },
    });
  }
}
