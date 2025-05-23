import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('/')
  getAllProducts(@Request() req) {
    return this.favoritesService.getAllProducts(req.anonymous);
  }

  @Post('/add/:id')
  addProduct(@Request() req, @Param('id') id: number) {
    return this.favoritesService.addProduct(req.anonymous, +id)
  }

  @Post('/remove/:id')
  removeProduct(@Request() req, @Param('id') id: number) {
    return this.favoritesService.removeProduct(req.anonymous, +id)
  }

  @Post('/clear')
  clearProducts(@Request() req) {
    return this.favoritesService.clearFavorites(req.anonymous)
  }
}
