import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/products/:productId')
  getProduct(@Param('productId') productId: string) {
    return this.appService.aggregateProduct(+productId);
  }
}
