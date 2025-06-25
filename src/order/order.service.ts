import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private JWTService: JwtService,
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

    if (!Array.isArray(cart)) {
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

      await this.cartService.clearCart(token)

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
        products: true
      }
    });
  }
}
