import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/:slug')
  findAll(@Param('slug') slug: string) {
    return this.productService.getProduct(slug)
  }
}
