import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductServiceClient } from './clients/product-service.client';
import { ReviewServiceClient } from './clients/review-service.client';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ProductServiceClient, ReviewServiceClient],
})
export class AppModule { }
