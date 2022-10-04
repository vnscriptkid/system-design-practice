import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProductAction } from './actions/create-product.action';
import { AppService } from './app.service';
import { CreateProductRequest } from './requests/create-product.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly createProductAction: CreateProductAction) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createProduct(@Body() request: CreateProductRequest) {

  }
}
