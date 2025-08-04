import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getProductCategory(slug: string, params: { page?: number }) {
    const { page } = params;
    const category = await this.prisma.category.findFirst({
      where: { slug },
    });

    if (category) {
      const take = 8;

      const products = await this.prisma.product.findMany({
        where: { categoryId: category.id },
        take,
        skip: page ? (page - 1) * take : 0,
      });

      const count = await this.prisma.product.count({where: { categoryId: category.id },})

      return {
        category,
        products,
        meta: {
          last_page: Math.ceil(count / take),
          current_page: Number(page),
        },
      };
    } else {
      return new NotFoundException('Такой категории не существует!');
    }
  }
}
