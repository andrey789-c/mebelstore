import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  getCart(@Request() req) {
    return this.cartService.getCart(req.anonymous);
  }

  @Post('/increment/:id')
  incrementToCart(@Request() req, @Param('id') id: number) {
    return this.cartService.changeToggleCountProduct(
      req.anonymous,
      id,
      'increment',
    );
  }

  @Post('/decrement/:id')
  decrementFromCart(@Request() req, @Param('id') id: number) {
    return this.cartService.changeToggleCountProduct(
      req.anonymous,
      id,
      'decrement',
    );
  }
  @Post('/remove/:id')
  removeFromCart(@Request() req, @Param('id') id: number) {
    return this.cartService.changeToggleCountProduct(
      req.anonymous,
      id,
      'remove',
    );
  }

  @Post('/clear') 
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.anonymous)
  }
}
