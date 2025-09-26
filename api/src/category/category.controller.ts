import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Get('/')
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get('/:slug')
  getProductsCategory(@Param('slug') slug, @Query() params: {page: number}) {
    return this.categoryService.getProductCategory(slug, params)
  }
}
