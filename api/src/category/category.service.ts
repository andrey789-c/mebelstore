import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

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

      const currentPage = Number(page) || 1;
      const lastPage = Math.ceil(count / take);

      // Обрабатываем изображения для каждого продукта
      const productsWithFullUrls = products.map(product => ({
        ...product,
        images: this.getFullImageUrls(product.images)
      }));

      return {
        category,
        products: productsWithFullUrls,
        meta: {
          last_page: lastPage,
          current_page: currentPage,
          next_page: currentPage < lastPage ? currentPage + 1 : null,
          prev_page: currentPage > 1 ? currentPage - 1 : null,
          total: count,
        },
      };
    } else {
      return new NotFoundException('Такой категории не существует!');
    }
  }

  async getAllCategories() {
    return await this.prisma.category.findMany()
  }
}
