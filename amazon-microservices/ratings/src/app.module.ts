import Redis from 'ioredis';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { productRatingsProviders, productsProviders } from './providers';
import { RedisService } from './redis.service';
import { RateProductAction } from './actions/rate-product.action';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    RedisService,
    Redis,
    ...productsProviders,
    ...productRatingsProviders,
    RateProductAction
  ],
})
export class AppModule { }
