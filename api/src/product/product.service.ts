import {Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProduct(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: {slug},
      select: {
        category: true, 
        id: true, 
        slug: true,
        name: true, 
        price: true,
        discount_price: true,
        categoryId: false
      }
    })

    if(product) {
      return {
        ...product,
      }
    } else {
      return new NotFoundException({
        error: 'Товар по этому slug не найден!'
      })
    }
  }
}
