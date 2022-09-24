import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/products/:productId')
  getProduct(@Param('productId') productId: number) {
    return this.appService.getProduct(productId);
  }

  @Post('/orders')
  placeOrder(@Body() body: any) {
    return this.appService.placeOrder(body);
  }
}
