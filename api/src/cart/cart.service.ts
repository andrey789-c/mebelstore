import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(
    private JWTService: JwtService,
    private prisma: PrismaService,
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

  private getFullImageUrls(images: string[]): string[] {
    const baseUrl = process.env.API_URL || 'http://localhost:8080';
    return images.map(image => {
      // Если изображение уже содержит полный URL, возвращаем как есть
      if (image.startsWith('http')) {
        return image;
      }
      // Иначе добавляем базовый URL
      return `${baseUrl}${image}`;
    });
  }

  async getCart(token: string) {
    const anonymousId = this.getAnonymousId(token);

    if (!anonymousId) return [];

    const cart = await this.prisma.cart.findUnique({
      where: { anonymousId },
      select: {
        items: {
          select: {
            quantity: true,
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
                category: true,
                discount_price: true,
              },
            },
          },
        },
      },
    });

    if (!cart) return [];

    const info = this.calcInfoPrice(cart.items)

    return {
      cart: cart.items.map((item) => ({
        ...item.product,
        image: this.getFullImageUrls(item.product.images)[0],
        quantity: item.quantity,
      })),
      info
    };
  }

  async changeToggleCountProduct(
    token: string,
    productId: number,
    type: 'increment' | 'decrement' | 'remove',
  ) {
    return await this.prisma.$transaction(async (prisma) => {
      const anonymousId = this.getAnonymousId(token);

      if (!anonymousId) return [];

      const cartId = await prisma.cart.findUnique({
        where: { anonymousId },
      });

      if (!cartId) throw new Error('error');

      type === 'increment'
        ? await this.addCart(cartId.id, +productId)
        : type === 'decrement'
          ? await this.decrementCart(cartId.id, +productId)
          : await this.removeCart(cartId.id, +productId);

      return this.getCart(token);
    });
  }

  async addCart(id: string, productId: number) {
    return await this.prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: id,
          productId: +productId,
        },
      },
      update: {
        quantity: { increment: 1 },
      },
      create: {
        cartId: id,
        productId: +productId,
        quantity: 1,
      },
    });
  }

  async decrementCart(id: string, productId: number) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: id,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new Error('Товар не найден в корзине');
    }

    if (cartItem.quantity === 1) {
      return await this.prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: id,
            productId,
          },
        },
      });
    }

    return await this.prisma.cartItem.update({
      where: {
        cartId_productId: {
          cartId: id,
          productId,
        },
      },
      data: {
        quantity: { decrement: 1 },
      },
    });
  }

  async removeCart(id: string, productId: number) {
    return await this.prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: id,
          productId,
        },
      },
    });
  }

  async clearCart(token: string) {
    return await this.prisma.$transaction(async (prisma) => {
      const anonymousId = this.getAnonymousId(token);
      if (!anonymousId) throw new Error('Недействительный токен');

      const cart = await prisma.cart.findUnique({
        where: { anonymousId },
        select: { id: true },
      });

      if (!cart) throw new Error('Корзина не найдена');

      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return [];
    });
  }

  calcInfoPrice(items: any) {
    const info: {price: number, discountPrice: number,  totalQuantity: number} = items.reduce((acc, item) => {
      return {
        price: acc.price + (Number(item.product.price) * item.quantity),
        discountPrice: acc.discountPrice + (Number(item.product.discount_price || 0) * item.quantity),
        totalQuantity: acc.totalQuantity + item.quantity
      };
    }, { price: 0, discountPrice: 0, totalQuantity: 0 });

    return info
  }
}
