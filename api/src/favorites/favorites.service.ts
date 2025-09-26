import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private prisma: PrismaService,
    private JWTService: JwtService,
  ) {}

  private getAnonymousId(token: string): string | null {
    if (!token) return null;

    try {
      const payload = this.JWTService.verify(token, {
        secret: process.env.JWT_SECRET || 'secret',
      });
      return payload.anonymousId;
    } catch (e) {
      console.error('JWT verification error:', e);
      return null;
    }
  }

  private async getFavoriteWithProducts(anonymousId: string) {
    return this.prisma.favorite.findUnique({
      where: { anonymousId },
      select: {
        products: {
          select: {
            product: {
              select: {
                name: true,
                id: true,
                slug: true,
                category: true,
                price: true,
                discount_price: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllProducts(token: string) {
    const anonymousId = this.getAnonymousId(token);
    if (!anonymousId) return [];

    const products = await this.getFavoriteWithProducts(anonymousId);
    return products?.products.map(({ product }) => product) ?? [];
  }

  async addProduct(token: string, id: number) {
    const anonymousId = this.getAnonymousId(token);
    if (!anonymousId) return null;

    const [product, favorite] = await Promise.all([
      this.prisma.product.findUnique({ where: { id: +id } }),
      this.prisma.favorite.findUnique({ where: { anonymousId } }),
    ]);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const favoriteId =
      favorite?.id ??
      (await this.prisma.favorite.create({ data: { anonymousId } })).id;

    try {
      const result = await this.prisma.favoriteItem.upsert({
        where: {
          favoriteId_productId: {
            favoriteId,
            productId: +id,
          },
        },
        create: {
          favoriteId,
          productId: +id,
        },
        update: {},
        select: {
          favorite: {
            select: {
              products: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      return result.favorite.products.map(({ product }) => product);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw new BadRequestException('Failed to add product to favorites');
    }
  }

  async removeProduct(token: string, id: number) {
    const anonymousId = this.getAnonymousId(token);
    if (!anonymousId) return null;

    const [product, favorite] = await Promise.all([
      this.prisma.product.findUnique({ where: { id: +id } }),
      this.prisma.favorite.findUnique({ where: { anonymousId } }),
    ]);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (!favorite?.id) {
      throw new BadRequestException('Favorite list not found');
    }

    try {
      await this.prisma.favoriteItem
        .delete({
          where: {
            favoriteId_productId: {
              favoriteId: favorite.id,
              productId: +id,
            },
          },
        });

        return await this.getAllProducts(token)
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw new BadRequestException('Failed to remove product from favorites');
    }
  }

  async clearFavorites(token: string) {
    const anonymousId = this.getAnonymousId(token);
    if (!anonymousId) return null;

    const favorites = await this.prisma.favorite.findUnique({
      where: { anonymousId },
      select: { id: true },
    });

    if(!favorites) {
      throw new Error('Not find favorites')
    }

    await this.prisma.favoriteItem.deleteMany({
      where: {favoriteId: favorites.id}
    })

    return []
  }
}
