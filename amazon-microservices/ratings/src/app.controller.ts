import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RateProductAction } from './actions/rate-product.action';
import { AppService } from './app.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { RateProductRequest } from './requests/rate-product.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly rateProductAction: RateProductAction) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/v1/products/:productId/ratings')
  async rateProduct(@Param('productId') productId: string, @Body() createRatingDto: CreateRatingDto) {
    await this.rateProductAction.execute(RateProductRequest.build({
      product_id: productId,
      rating: createRatingDto.rating,
      comment: createRatingDto.comment
    }))
  }
}
